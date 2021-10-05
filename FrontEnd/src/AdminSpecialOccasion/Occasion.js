import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Ocassion = (props) => {
  let occasion = props.data;
  console.log(occasion);


  return (
   
    
    <div class="col-md">
    <div className="card bg-c-blue order-card">
      
      <div className="card-block">
        <h5 className="card-title">{occasion.email}</h5>
        <p className="card-text"> occasion type : {occasion.type}</p>
        <p className="card-text">date : {occasion.date}</p>
        <p className="card-text">Time : {occasion.time}</p>
        <p className="card-text">Menu Type : {occasion.menu}</p>
        <p className="card-text">Number of Guests : {occasion.guests}</p>


        <div style={{ float: "center" }}>
          <button className="btn btn-light" onClick={() => props.deleteOccasion(occasion._id)}>Delete</button>
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default Ocassion;
