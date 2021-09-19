const express = require ("express");
const router = express.Router();

const Room = require('../models/room')

//importing controller from rooms
const {getRooms,addRoom,updateRoom,deleteRoom,getRoomByID} = require("../controllers/roomController")
//import {getRooms} from "../controllers/roomController"

//implementation is in controller
router.get("/getallrooms", getRooms);

router.post("/add", addRoom);

router.put("/update/:id", updateRoom);

router.delete("/delete/:id", deleteRoom);

router.get("/get/:id", getRoomByID)



module.exports = router;