import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Room = (props) => {
  let room = props.data;
  console.log(room);


  return (
    <div className="row roombox m-2 p-2 rounded">
      <div className="col-md-4 ">
        <img src={room.imageurls[0]} className="smallimage " alt="" />
      </div>
      <div className="col-md-7 text-left">
        <h5 className="card-title">{room.name}</h5>
        <p className="card-text">{room.type}</p>
        <p className="card-text">Room Size : {room.size}</p>
        <p className="card-text">{room.number}</p>
        <div style={{ float: "right" }}>
          <button className="btn btn-dark m-1">Edit</button>
          <button className="btn btn-dark m-1" onClick={() => props.deleteRoom(room._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Room;
