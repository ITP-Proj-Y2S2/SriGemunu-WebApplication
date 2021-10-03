import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Booking from "../Admin/Booking";

function AdminBooking() {

  const [bookings, setbookings] = useState([]);

  useEffect(async () => {
    try {
      const data = (await axios.get("http://localhost:8070/api/booking/getallbookings")).data;
      // console.log(data);
      setbookings(data);
    } catch (error) {
      console.log(error);
    }
  }, []);


  function deleteBookingHandler(id){
    // console.log(id)
    // console.log(bookings)
    axios.delete(`http://localhost:8070/api/booking/delete/${id}`).then(() => alert("delete success"));
  }

  return (
  <div>
    <div className="container">
      <h1 className="text-center mt-2">Current Bookings</h1>
      <h5 className="text-center mt-3">
        Total {bookings.length} bookings
      </h5>

      <div className="row justify-content-center mt-5">
        {bookings.map((booking) => {
          return (
            <div className="col-md-9 mt-2">
              <Booking data={booking} deleteBooking = {deleteBookingHandler}/>
            </div>
          );
        })}
      </div>
    </div>

  </div>
  );
}

export default AdminBooking;
