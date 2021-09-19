const express = require("express");
const Booking = require("../models/booking")
const moment = require("moment")

const Room = require("../models/room")


const addBooking = async (req, res) => {
    try {
        const { room, roomId, userId, basis, fromDate, toDate, totalDays, totalAmount, status } = req.body;

        const newBooking = new Booking({
        room : room.name,
        roomId : room._id,
        //   room,
        //   roomId,
          userId,
          basis,
          fromDate: moment(fromDate).format("DD-MM-YYYY"),
          toDate: moment(toDate).format("DD-MM-YYYY"),
          totalDays,
          totalAmount,
          status,
        });

         const booking = await newBooking.save()
         res.json("Booking added");
       
        const tempRoom = await Room.findOne({ _id: room._id });

        tempRoom.currentbookings.push({
          bookingId: booking._id,
          fromDate: moment(fromDate).format("DD-MM-YYYY"),
          toDate: moment(toDate).format("DD-MM-YYYY"),
          userId :userId,
          status: booking.status,

        });

        await tempRoom.save()

    } catch (error) {
        console.log(error);
    }
}

module.exports = { addBooking };

