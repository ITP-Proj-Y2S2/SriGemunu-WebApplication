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

const getBookings = async (req, res) => {
  try {
      const bookings = await Booking.find()
      //return res.json({ bookings });
      res.send(bookings)
  } catch (error) {
      return res.status(400).json({ message: error })

  }
}

const getBookingByID = async (req,res)=>{
  try {
    let bookingID = req.params.id;

    //check curly braces if not working
    const booking = await Booking.findById(bookingID)
    res.send(booking);

  } catch (error) {
    return res.status(400).json({message: error})
  }
}

const deleteBooking = async (req, res) => {
  try {
    let bookingID = req.params.id;
    
    const booking = await Booking.findOne({ _id: bookingID});
    booking.status = "cancelled"
    await booking.save();


    const tempRoom = await Room.findOne({ _id: booking.roomId });
   // console.log(tempRoom)
    
   const roomBookings = tempRoom.currentbookings;

   const temp = roomBookings.filter(booking => booking.bookingId.toString()!==bookingID)
   tempRoom.currentbookings = temp;
    await tempRoom.save().then(() => {
      res.status(200).send({ status: "delete success" });
    });
    

  } catch (error) {
    return res.status(400).json({ message: error });
  }
};



const getuserbooking = async (req,res)=>{
  let userId = req.body.userId;
  console.log(userId)

  try {
    const bookings = await Booking.find({userId : userId})
    //console.log(bookings)
    res.send(bookings);

  } catch (error) {
    return res.status(400).json({message: error})
  }
}



module.exports = { addBooking ,getBookings, getBookingByID, deleteBooking, getuserbooking};

