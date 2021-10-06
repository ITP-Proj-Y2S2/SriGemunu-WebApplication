import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Bar, Doughnut } from 'react-chartjs-2';
import jsPDF from 'jspdf'
import "jspdf-autotable";
import Booking from "../Admin/Booking";

function AdminBooking() {

  const [bookings, setbookings] = useState([]);
  const [users, setUsers] = useState([]);

  // const [roomTypeArray, setRoomTypeArray] = useState([10,20]);

  useEffect(async () => {
    try {
      const data = (await axios.get("http://localhost:8070/api/booking/getallbookings")).data;

      //console.log(data);
      setbookings(data);

      const users = (await axios.get("http://localhost:8070/api/auth/users/getall")).data;
      //console.log(users);
      setUsers(users);


    } catch (error) {
      console.log(error);
    }

  }, []);


  function deleteBookingHandler(id) {
    // console.log(id)
    axios.delete(`http://localhost:8070/api/booking/delete/${id}`).then(() => alert("cancellation success")).then(() => { window.location.href = "http://localhost:3000/admin/bookings" });
  }


  let profit = 0;
  let roomTypeArray = [0, 0, 0]
  let confirmedroomTypeArray = [0, 0, 0]
  let bookingStatusAnalysis = [0, 0]


  bookings.map(booking => {
    //matching user id with customer name
    users.map(user=>{
      if(booking.userId == user._id ){
        booking.userName = user.cusname
      }
    })
  
    //setting booking basis
    if(booking.basis == "RoomOnly"){
      booking.basisName="Room Only"
    }
    else if(booking.basis == "BB"){
      booking.basisName="Bed and Breakfast"
    }
    else if(booking.basis == "FB"){
      booking.basisName=" Full board"
    }


    //counting cancelled bookings
    if (booking.status == "cancelled") {
      bookingStatusAnalysis[0] = bookingStatusAnalysis[0] + 1
    }

    //counting basis 
    if (booking.status == "booked") {
      profit = profit + parseInt(booking.totalAmount)
      // console.log(booking.totalAmount)
      if (booking.basis == "RoomOnly") {
        confirmedroomTypeArray[0] = confirmedroomTypeArray[0] + 1
      }
      else if (booking.basis == "BB") {
        confirmedroomTypeArray[1] = confirmedroomTypeArray[1] + 1
      }
      else if (booking.basis == "FB") {
        confirmedroomTypeArray[2] = confirmedroomTypeArray[2] + 1
      }
      bookingStatusAnalysis[1] = bookingStatusAnalysis[1] + 1
    }
    if (booking.basis == "RoomOnly") {
      roomTypeArray[0] = roomTypeArray[0] + 1
    }
    else if (booking.basis == "BB") {
      roomTypeArray[1] = roomTypeArray[1] + 1
    }
    else if (booking.basis == "FB") {
      roomTypeArray[2] = roomTypeArray[2] + 1
    }

  })
  console.log(bookingStatusAnalysis)
  console.log(roomTypeArray)




  //chart data
  const roomChart = {
    labels: ["Room only", "Bed and breakfast", "Full board"],
    datasets: [
      {
        backgroundColor: ["#007aff", "#34c759", "red"],
        hoverBackgroundColor: ["#00438c", "#1d6d31", "red"],
        data: roomTypeArray,
      },
    ],
  };

  const confirmedroomType = {
    labels: ["Room only", "Bed and breakfast", "Full board"],
    datasets: [
      {
        backgroundColor: ["#007aff", "#34c759", "red"],
        hoverBackgroundColor: ["#00438c", "#1d6d31", "red"],
        data: confirmedroomTypeArray,
      },
    ],
  };

  const bookingChart = {
    labels: ["Cancelled", "Booked"],
    datasets: [
      {
        label: "Booking Status",
        data: bookingStatusAnalysis,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const bookingChartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  

 function generatePDFBooking(bookings) {
    const doc = new jsPDF();
    const tableColumn = [ "Customer" ,"Room","From", "To", "Basis", "Amount (LKR)" ,"Status"];
    const tableRows = [];
    bookings
      .map((booking) => {


        const bookingDetails = [
          booking.userName,
          booking.room,
          booking.fromDate,
          booking.toDate,
          booking.basisName,
          booking.totalAmount,
          booking.status
        ];
        tableRows.push(bookingDetails);
      });
      doc.text("Sri Gemunu Beach Resort ", 14, 15).setFontSize(15);
    doc.text("Room Bookings ", 14, 22).setFontSize(12);
    doc.autoTable(tableColumn, tableRows, {
      styles: { fontSize: 12, halign: "center" },
      startY: 35,
    });
    window.open(URL.createObjectURL(doc.output("blob")));
    doc.save("booking_Report.pdf");
  }

  
  return (

    <div style={{ marginTop: "80px" }}>

      <div className="container mt-5 " >
        <h1 className="text-center mt-2 ">Current Bookings</h1>
        <h5 className="text-center mt-3">
          Total {bookings.length} bookings

        </h5>

        <div className="row justify-content-center mt-5 ">
          <table className="table table-bordered table-dark roombox">
            <thead className="roombox thead-dark">
              <tr >
                <th >Boooking ID</th>
                <th>User ID</th>
                <th>Room</th>
                <th>From</th>
                <th>To</th>
                <th>Basis</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Cancel Booking</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length && (bookings.map(booking => {
                return (
                  <tr>
                    <td style={{ paddingBottom: "20px" }}> {booking._id}</td>
                    <td> {booking.userName}</td>
                    <td> {booking.room}</td>
                    <td> {booking.fromDate}</td>
                    <td> {booking.toDate}</td>
                    <td> {booking.basisName}</td>
                    <td> {booking.status}</td>
                    <td> {booking.totalAmount} LKR</td>
                    <td>{booking.status == "cancelled" ? "" : <button className="btn btn-warning m-1" onClick={() => deleteBookingHandler(booking._id)}>Cancel</button>}</td>
                  </tr>
                )
              }))}
            </tbody>
          </table>

        </div>

        <div className = "d-flex justify-content-center mt-3 ">
          <button className = "btn btn-warning btn-lg" onClick = {()=>{generatePDFBooking(bookings)}} >Generate PDF</button>
        </div>
      </div>
      <div className="container" style={{ marginBottom: "100px", marginTop: "75px" }}>
        <h3 align="center"> Booking Analysis</h3>
        <h5 align="center"> Room Basis Analysis</h5>
        <div className="row ">
          <div className="col-md-6 ">
            <Doughnut
              data={roomChart}
              width={250}
              height={250}
              options={{ maintainAspectRatio: false }}
            />
          </div>
          <div className="col-md-6">

            <Doughnut
              data={confirmedroomType}
              width={250}
              height={250}
              options={{ maintainAspectRatio: false }}
            />

          </div>
        </div>
        <div className="row ">
          <div className="col-md-6 "> <p align="center">Including cancelled bookings</p></div>
          <div className="col-md-6 "> <p align="center">Excluding cancelled bookings</p> </div>
        </div>

        <div className="row mt-5">
          <h5 align="center" > Room Status Analysis</h5>
          <div className="col-md-12"> </div>
          <div  style={{width:"50%", marginLeft:"270px", marginTop:"40px"}}>
          <Bar data={bookingChart}
            width={100}
            height={50}
            options={{ maintainAspectRatio: false }}
            options={bookingChartOptions} />
             </div>
        </div>
      </div>

    </div>
  );
}

export default AdminBooking;
