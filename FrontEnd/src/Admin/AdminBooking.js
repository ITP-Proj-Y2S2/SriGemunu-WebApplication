import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Booking from "../Admin/Booking";

function AdminBooking() {

  const [bookings, setbookings] = useState([]);

  useEffect(async () => {
    try {
      const data = (await axios.get("http://localhost:8070/api/booking/getallbookings")).data;
       console.log(data);
      setbookings(data);
    } catch (error) {
      console.log(error);
    }
  }, []);


  function deleteBookingHandler(id){
    // console.log(id)
    // console.log(bookings)
    axios.delete(`http://localhost:8070/api/booking/delete/${id}`).then(() => alert("cancellation success")).then(()=>{window.location.href = "http://localhost:3000/admin/bookings"});
  }

  return (
  <div style = {{marginTop: "80px"}}>
    <div className="container mt-5 " >
      <h1 className="text-center mt-2 ">Current Bookings</h1>
      <h5 className="text-center mt-3">
        Total {bookings.length} bookings
      </h5>

      <div className="row justify-content-center mt-5 " style = {{marginBottom: "350px"}}>
          <table className = "table table-bordered table-dark roombox">
            <thead className ="roombox thead-dark">
              <tr >
                <th >Boooking ID</th>
                <th>User ID</th>
                <th>Room</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Cancel Booking</th>
              </tr>
            </thead>
            <tbody>
            {bookings.length && (bookings.map(booking =>{
                return(
                  <tr>
                   <td style = {{paddingBottom: "20px"}}> {booking._id}</td>
                   <td> {booking.userId}</td>
                   <td> {booking.room}</td>
                   <td> {booking.fromDate}</td>
                   <td> {booking.toDate}</td>
                   <td> {booking.status}</td>
                   <td> {booking.totalAmount} LKR</td>
                   <td>{booking.status == "cancelled"? "" : <button className="btn btn-warning m-1" onClick={() => deleteBookingHandler(booking._id)}>Cancel</button>}</td>
                    </tr>
                )
            }))}
            </tbody>
          </table>




        {/* {bookings.map((booking) => {
          return (
            <div className="col-md-9 mt-2">
              <Booking data={booking} deleteBooking = {deleteBookingHandler}/>
            </div>
          );
        })} */}
      </div>
    </div>

  </div>
  );
}

export default AdminBooking;
