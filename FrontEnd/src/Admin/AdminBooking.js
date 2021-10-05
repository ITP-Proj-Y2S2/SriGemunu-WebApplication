import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {Bar,Pie,Doughnut} from 'react-chartjs-2';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';

import Booking from "../Admin/Booking";

function AdminBooking() {

  const [bookings, setbookings] = useState([]);
  // const [roomTypeArray, setRoomTypeArray] = useState([10,20]);

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


  let profit = 0;
  let roomOnly = 0
  let BB = 0
  let FB =0 ;
  let roomTypeArray = []
  

  // function calculateBookingRevenue(){
    
    bookings.map(booking=>{
      //console.log(booking.basis)

      
        if(booking.status=="booked"){
          profit = profit+ parseInt(booking.totalAmount)
          console.log(booking.totalAmount)
        }
        if(booking.basis == "RoomOnly" ){
          roomOnly+=1
        }
        else if(booking.basis == "BB" ){
          BB+=1
        }
        else if(booking.basis == "FB"){
          FB+=1
        }

       // { ? " Room Only" : ?  " Bead and Breakfast" : ? "  Full board" : ""}
      
    })
    roomTypeArray = [roomOnly, BB, FB]
    console.log(profit)
    console.log(BB)
    console.log(FB)
    console.log(roomOnly)
    console.log(roomTypeArray)  
  // }

  const statePieChart = {
    labels: ['Room only', 'Bead and breakfast', 'Full board'],
    datasets: [
      {
        label: 'Room Kids',
        backgroundColor: [
          '#007aff',
          '#34c759',
          'red',
          
        ],
        hoverBackgroundColor: [
        '#00438c',
        '#1d6d31',
        'red',
        
        ],
        data: roomTypeArray
      }
    ]
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

      </div>
      <div className= "row">
      <div className= "col-md-5">
      <Doughnut
          data={statePieChart}
          options={{
            title:{
              display:true,
              text:'Pie Chart',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
      </div>
    </div>

  </div>
  );
}

export default AdminBooking;
