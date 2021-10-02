const express = require("express")
const router = express.Router();
const Booking = require("../models/booking")

const {addBooking, getBookings ,getBookingByID , deleteBooking, getuserbooking} = require("../controllers/bookingController")

router.post("/add", addBooking);

router.get("/getallbookings", getBookings);

router.get("/get/:id", getBookingByID);

router.delete("/delete/:id", deleteBooking);

router.post("/getuserbooking",getuserbooking)






module.exports = router;