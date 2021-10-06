import React, { useState } from "react";
import { Link } from "react-router-dom";
import './EventDesign.css';


export default function OccasionHome() {

  return (
    <div >
    <div className="bgimg textCenter" >
      <div className="d-flex justify-content-center p-5 m-5"></div>
      <h1 className="display-1 fontcolor-white md-5">Events</h1>
      <div className = "container">
      <div className="row md-5  align-items-top">
        <div className="col-sm-6">
          <div className="d-flex justify-content-start p-5"></div>
          <div className="card" style = {{marginBottom: "300px"}}>
            <div className="card-body">
              <h5 className="card-title">Book our venue</h5>
              <p className="card-text">Reserve our beautiful venue for your special day</p>
              <Link to={"/specialoccasion/OccasionHome/OccasionType"} className="btn btn-primary">Book now!</Link>
            </div>
          </div>
          </div>
        
        <div className="col-sm-6">
          <div className="d-flex justify-content-start p-5"></div>
          <div className="card" style = {{marginBottom: "300px"}}>
            <div className="card-body">
              <h5 className="card-title">Already booked one?</h5>
              <p className="card-text">Want to know what you have booked?</p>
              <Link to={"/specialoccasion/OccasionHome/ViewOccasion"} className="btn btn-primary">View Events</Link>
            </div>
          </div>
        </div>
       
      </div>
      </div>
      </div>

    </div>


  )
}

