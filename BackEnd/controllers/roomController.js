const express = require("express");
const Room = require('../models/room');

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({})
        //return res.json({ rooms });
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({ message: error })

    }
}

const addRoom = async (req, res) => {
    try {
        const { name, type, size, number, imageurls, currentbookings, description } = req.body;

        const newRoom = new Room({
          name,
          type,
          size,
          number,
          imageurls,
          currentbookings,
          description,
        });

        newRoom.save().then(()=>{
            res.json("Room added")
        })

    } catch (error) {
        console.log(error)
    }
}

const updateRoom = async (req,res)=>{

    try {
      let roomID = req.params.id;
    
      const {
        name,
        type,
        size,
        number,
        imageurls,
        description,
      } = req.body;


      const updateRoom = {
        name,
        type,
        size,
        number,
        imageurls,
        description,
      };

      const update = await Room.findByIdAndUpdate(roomID, updateRoom).then(
        () => {
          res.status(200).send({ status: "Room updated" });
        }
      );

    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "error updating", error: err.message });
    }
}



const deleteRoom = async (req,res) =>{
    let roomID =  req.params.id;

    await Room.findByIdAndDelete(roomID).then(()=>{

        res.status(200).send({status: "success delete"});

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "failed to delete", error: err.message})
    })
}

const getRoomByID = async (req, res) => {
  let roomID = req.params.id;

  try {
    const room = await Room.findById(roomID);
    //return res.json({ rooms });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};



module.exports = {getRooms,addRoom,updateRoom,deleteRoom,getRoomByID};
