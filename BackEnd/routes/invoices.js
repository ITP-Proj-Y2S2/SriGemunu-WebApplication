const router = require("express").Router();
let Invoice = require("../models/Invoice");

router.route("/add").post((req, res) => {
  console.log("/add POST");
  const invoiceID = (req.body.invoiceID);
  const billingName = req.body.billingName;
  const billingAddress = req.body.billingAddress;
  const mobileNumber = req.body.mobileNumber;
  const roomNumber = (req.body.roomNumber);
  const noOfAdults = (req.body.noOfAdults);
  const noOfChildern = (req.body.noOfChildern);
  const totalDates = (req.body.totalDates);
  const totalAmount = req.body.totalAmount;

  const newInvoice = new Invoice({
    invoiceID,
    billingName,
    billingAddress,
    mobileNumber,
    roomNumber,
    noOfAdults,
    noOfChildern,
    totalDates,
    totalAmount
  });

  newInvoice
    .save()
    .then(() => {
      res.json("Invoice record added sucessfully!");
    })
    .catch((error1) => {
      console.log(error1);
    });
});

//get all data
router.route("/").get((req, res) => {
  
 

  Invoice.find()
    .then((invoices) => {
      res.json(invoices);
    })
    .catch((error2) => {
      console.log(error2);
    });
});



//updating record

router.route("/update/:invid").post(async (req, res) => {
  let userID = req.params.invid;
  const {
    invoiceID,
    billingName,
    billingAddress,
    mobileNumber,
    roomNumber,
    noOfAdults,
    noOfChildern,
    totalDates,
    totalAmount,
  } = req.body;
  // getting data from database using desctructrue method

  const updatedInvoice = {
    invoiceID,
    billingName,
    billingAddress,
    mobileNumber,
    roomNumber,
    noOfAdults,
    noOfChildern,
    totalDates,
    totalAmount,
  };

  const update = await Invoice.findByIdAndUpdate(userID, updatedInvoice)
    .then(() => {
      res.status(200).send({ status: "Invoice Updated Sucessfully " });
    })
    .catch((error3) => {
      console.log(error3);
      res
        .status(500)
        .send({
          status: "Failed to update Invoice data",
          error3: error3.message,
        });
    });
});

//deleting record

router.route("/delete/:invid").delete(async (req, res) => {
  let userID = req.params.invid;
  await Invoice.findByIdAndDelete(userID)
    .then(() => {
      res.status(200).send({ status: "Invoice record sucessfully deleted" });
    })
    .catch((error4) => {
      console.log(error4);
      res
        .status(500)
        .send({
          status: "Failed to delete Invoice record",
          error4: error4.message,
        });
    });
});

//last data fetch
router.route("/view/last").get(async (req, res) => {
  
  const LastUser = await Invoice.find({}).sort({_id:-1}).limit(1)

    .then((LastUser) => {
      res.status(200).send(LastUser[0])
      }).catch((error5) => {
      console.log(error5);
      res
        .status(500)
        .send({
          status: "Something went wrong with invoice",
          error5: error5.message,
        });
    });
});

//total invoice count
router.route("/view/count").get(async (req, res) => {
  Invoice.find()
    .then((invoices) => {
      // res.json(invoices.length);
      const TotalCount = invoices.length;
      res.json(TotalCount);
      
    })
    .catch((error2) => {
      console.log(error2);
    });
});



//fetch data
router.route("/view/:id").get(async (req, res) => {
  let userId = req.params.id;
  const user = await Invoice.findById(userId)

    .then((user) => {
      res.status(200).send(user)
      }).catch((error5) => {
      console.log(error5);
      res
        .status(500)
        .send({
          status: "Something went wrong with invoice",
          error5: error5.message,
        });
    });
});





module.exports = router;
