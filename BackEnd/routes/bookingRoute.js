const express = require("express")
const router = express.Router();
const Booking = require("../models/booking")

const {addBooking, getBookings ,getBookingByID , deleteBooking} = require("../controllers/bookingController")

router.post("/add", addBooking);

router.get("/getallbookings", getBookings);

router.get("/get/:id", getBookingByID);

router.delete("/delete/:id", deleteBooking);






module.exports = router;