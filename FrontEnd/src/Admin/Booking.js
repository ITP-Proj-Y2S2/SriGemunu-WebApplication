import React, { useState, useEffect } from "react";
import axios from "axios";

const Booking = (props) => {
  let booking = props.data;
  console.log(booking);


  return (
    <div className="row roombox m-2 p-2 rounded">
      <div className="col-md-7 text-left">
        <h5 className="card-title">Booked Room :{booking.room}</h5>
        <p className="card-text">Room Basis :{booking.basis}</p>
        <p className="card-text">Total days : {booking.totalDays}</p>
        <p className="card-text">From date :{booking.fromDate}</p>
        <p className="card-text">To date :{booking.toDate}</p>
        <p className="card-text">Booking amount : {booking.totalAmount}</p>
        <p className="card-text">User ID :{booking.userId}</p>
        <h4 className="card-text">Booking Status :{booking.status}</h4>
        {booking.status == "cancelled" ? "" : <div style={{ float: "right" }}>
          <button className="btn btn-dark m-1" onClick={() => props.deleteBooking(booking._id)}>Cancel</button>
        </div>}

      </div>
    </div>
  );
};

export default Booking;
