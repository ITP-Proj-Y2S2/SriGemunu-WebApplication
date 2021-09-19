const express = require("express")
const router = express.Router();
const Booking = require("../models/booking")

const {addBooking} = require("../controllers/bookingController")

router.post("/add", addBooking);



module.exports = router;