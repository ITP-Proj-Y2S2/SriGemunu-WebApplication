const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const {STATES} = require ('mongoose');

exports.register = async(req,res, next)=> {
    const{cusname, telnum, username, email, password} = req.body;

    try{
        const user = await User.create({
            cusname,
            telnum,
            username,
            email, 
            password,
        });

        sendToken(user, 201, res);

        } catch (error) {
            next(error);
        }
    };

exports.login = async(req,res, next)=> {
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorResponse("Please provide an email and password",400));
    }
    try {
        // Check that user exists by email
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }
        const userobj = await User.findOne({ email })
        sendToken(user, 200, res, userobj);

    } catch (err) {
        next(err);
    }
};

exports.forgotpassword = async (req,res, next)=> {
    const {email} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user) {
            return next(new ErrorResponse("Email could not be sent", 404))
        }

        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        // HTML Message
        const message = `
             <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;
        try {
            await sendEmail({
              to: user.email,
              subject: "Password Reset Request",
              text: message,
            });
      
            res.status(200).json({ success: true, data: "Email Sent" });
          } catch (err) {
      
            console.log(err);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
      
            await user.save();
      
            return next(new ErrorResponse("Email could not be sent", 500));
          }
        } catch (err) {
          next(err);
        }
      };

exports.resetpassword = async (req,res, next)=> {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

try {
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })

  if (!user) {
    return next(new ErrorResponse("Invalid Token", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(201).json({
    success: true,
    data: "Password Updated Success",
   
  });
} catch (error) {
  next(error);
}
};

const sendToken = (user, statusCode,res , userobj) =>{
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({success: true, token , "userobj" : userobj})
};


exports.getUserByID = async (req, res) => {
  let userID = req.params.id;

  try {
    const user = await User.findById(userID);
    //console.log(user)
    res.send(user);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
