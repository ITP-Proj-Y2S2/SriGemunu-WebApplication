const express = require('express');
const router = express.Router();

const{
    register,
    login,
    forgotpassword,
    resetpassword,
    getUserByID
} = require("../controllers/auth");


router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

router.route("/user/:id").get(getUserByID);


module.exports = router;