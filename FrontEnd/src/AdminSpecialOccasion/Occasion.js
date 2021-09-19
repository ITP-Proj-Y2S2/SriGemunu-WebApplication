import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Ocassion = (props) => {
  let occasion = props.data;
  console.log(occasion);


  return (
    <div className="row roombox m-2 p-2 rounded">
      
      <div className="col-md-7 text-left">
        <h5 className="card-title">{occasion.email}</h5>
        <p className="card-text"> occasion type : {occasion.type}</p>
        <p className="card-text">date : {occasion.date}</p>
        <p className="card-text">Time : {occasion.time}</p>
        <p className="card-text">Menu Type : {occasion.menu}</p>
        <p className="card-text">Number of Guests : {occasion.guests}</p>


        <div style={{ float: "center" }}>
          <button className="btn btn-primary" onClick={() => props.deleteOccasion(occasion._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Ocassion;
