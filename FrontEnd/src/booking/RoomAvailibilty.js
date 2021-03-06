import React, { Component } from "react";
import BookingScreen from "./BookingScreen";
import { Link } from "react-router-dom";
import axios from "axios";
import "./BookingScreen.css";

import AOS from 'aos';
import 'aos/dist/aos.css';

var moment = require("moment");

AOS.init({
  duration: 500
});


export class RoomAvailibilty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomType: props.match.params.room,
      basis: props.match.params.basis,
      fromDate: props.match.params.fromDate,
      toDate: props.match.params.toDate,
      sendDBroom: null,
      roomDB: [],
      isSuccess: false,
      userId: localStorage.getItem("_id")
    };
    this.bookRoom = this.bookRoom.bind(this);
    this.checkRoomAvailability = this.checkRoomAvailability.bind(this);
  }

  async componentDidMount() {
    try {
      await axios
        .get("http://localhost:8070/api/rooms/getallrooms")
        .then((response) => {
          this.setState({
            roomDB: response.data,
          });
        });
     
    } catch (error) {
      console.log(error);
    }

    try {
      await axios
        .get("http://localhost:8070/api/booking/getallbookings")
        .then((response) => {
          this.setState({
            bookingDB: response.data,
          });
        });
        
    } catch (error) {
      console.log(error);
    }
    this.checkRoomAvailability();
  }

  async bookRoom() {
    const bookingDetails = {
      room: this.state.sendDBroom,
      userId: this.state.userId,
      basis: this.state.basis,
      fromDate: moment(this.state.fromDate, "DD-MM-YYYY"),
      toDate: moment(this.state.toDate, "DD-MM-YYYY"),
      totalDays: this.state.totalDays,
      totalAmount: this.state.totalAmount,
    };
    try {

      console.log(bookingDetails);
      const result = await axios.post(
        "http://localhost:8070/api/booking/add",
        bookingDetails
      ).then(this.setState({
        isSuccess: true,
      })).then(() => {
        this.props.history.push({
          pathname: '/booking/BookingAvailability/BookingConfirmation',
          state: this.state,
        });
      })
      this.setState({
        isSuccess: true,
      });
      //using histort to navigate to booking success page


    } catch (error) {
      alert(error);
    }
  }


  checkRoomAvailability() {
    const roomType = this.state.roomType;
    const basis = this.state.basis;

    console.log(roomType);
    console.log(this.state.roomDB);

    let fromDate = moment(this.state.fromDate, "DD-MM-YYYY");
    let toDate = moment(this.state.toDate, "DD-MM-YYYY");

    const totalDays = moment.duration(toDate.diff(fromDate)).asDays() + 1;
    this.setState({
      totalDays: totalDays,
    });



    // calculating total ammounts

    let totalAmount;
    switch (roomType) {
      case "King":
        switch (basis) {
          case "BB":
            totalAmount = totalDays * 6000
            break;

          case "FB":
            totalAmount = totalDays * 7500
            break;

          case "RoomOnly":
            totalAmount = totalDays * 4000
            break;
        }
        break;
      case "Deluxe": {
        switch (basis) {
          case "BB":
            totalAmount = totalDays * 5000
            break;

          case "FB":
            totalAmount = totalDays * 6500
            break;

          case "RoomOnly":
            totalAmount = totalDays * 3000
            break;
        }
        break;
      }
    }
    this.setState({
      totalAmount: totalAmount,
    });
    // end of calculating total ammounts



    let rooms = this.state.roomDB;
    let roomSelect = [];
    let selectedRoom = [];
    let availability = false;
    let flag = false;


    rooms.map((r) => {
      if (r.type == roomType) {
        roomSelect.push(r);
      }
    });

    //console.log(roomSelect);

    roomSelect.map((e) => {
      //console.log(fromDate)

      if (e.currentbookings.length > 0) {

        for (const booking of e.currentbookings) {
          // console.log(moment(moment(fromDate).format('MM-DD-YYYY')).isBetween(moment(moment(booking.fromDate,'DD-MM-YYYY').format('MM-DD-YYYY')),(moment(moment(booking.toDate,'DD-MM-YYYY').format('MM-DD-YYYY')))))
          // console.log(moment(moment(toDate).format('MM-DD-YYYY')).isBetween(moment(moment(booking.fromDate,'DD-MM-YYYY').format('MM-DD-YYYY')),(moment(moment(booking.toDate,'DD-MM-YYYY').format('MM-DD-YYYY')))))

          if (
            !moment(fromDate.format("YYYY-MM-DD")).isBetween(
              moment(moment(booking.fromDate, "DD-MM-YYYY").format("YYYY-MM-DD")),
              moment(moment(booking.toDate, "DD-MM-YYYY").format("YYYY-MM-DD"))
            ) &&
            !moment(toDate.format("YYYY-MM-DD")).isBetween(
              moment(moment(booking.fromDate, "DD-MM-YYYY").format("YYYY-MM-DD")),
              moment(moment(booking.toDate, "DD-MM-YYYY").format("YYYY-MM-DD"))
            )
          ) {
            //console.log(moment(fromDate).format('DD-MM-YYYY') !== booking.fromDate)
            if (
              moment(fromDate).format("DD-MM-YYYY") !== booking.fromDate &&
              moment(fromDate).format("DD-MM-YYYY") !== booking.toDate &&
              moment(toDate).format("DD-MM-YYYY") !== booking.fromDate &&
              moment(toDate).format("DD-MM-YYYY") !== booking.toDate
            ) {
              availability = true;
            } else {
              availability = false;
              flag = true;
            }
          }
        }
      }
      if ((availability === true && flag == false) || e.currentbookings.length === 0) {
        //console.log(availability)
        selectedRoom.push(e);
      }
    });
    //console.log(selectedRoom);
    let sendDBroom;
    if (selectedRoom.length > 0) {
      sendDBroom = selectedRoom[0];
      this.setState({
        sendDBroom: sendDBroom,
      });
    }

    //console.log(this.state.sendDBroom);
    let count=0;
    this.state.bookingDB.map((booking)=>{
      if(booking.status =="booked"){
        if(this.state.userId == booking.userId){
          count+=1;
        }
      }
    })

    this.setState({
      count: count,
    });
  }



  render() {

    //console.log(this.state.roomDB)
    if (this.isSuccess == true) {
      this.props.history.push({
        pathname: '/booking/BookingAvailability/BookingConfirmation',
        state: this.state,
      });
    }

    const user = JSON.parse(localStorage.getItem("currentUser"))

    return (
      <div className="bgimg p-5" data-aos="fade-down">
        <section className="clean-block-booking dark p-5">
          <div className="container">
            <div className="text-center block-heading ">
              <h1 className="display-1 text-white pt-2">Reservation</h1>
            </div>
            <div className="container ">
              <div className="row d-flex justify-content-center">
                <div
                  className="block-content-booking col-10 "
                  style={{ opacity: "0.9" }}
                >
                  <div className="  text-center">
                    {this.state.sendDBroom ? (
                      <h2>Selected Dates are Available!</h2>
                    ) : (
                      <h2>Selected Dates are Not Available!</h2>
                    )}

                    <p className="lead">
                      Check in: {this.state.fromDate} | Check out: {" "}
                      {this.state.toDate}
                    </p>
                    <p className="lead">Total Days {this.state.totalDays}</p>
                    <p className="lead">Room type: {this.state.roomType == "King" ? "  King Room" : this.state.roomType == "Deluxe" ? " Deluxe Room" : ""}  </p>
                    <p className="lead">Basis: {this.state.basis == "RoomOnly" ? " Room Only" : this.state.basis == "BB" ? " Bed and Breakfast" : this.state.basis == "FB" ? "  Full board" : ""} </p>
                    {this.state.count>=2 ? <p className="h3"><b>We only allow two room reservations per user through online. Please contact the hotel for more reservations </b></p>: <p className="h5"><b>You will have to pay {this.state.totalAmount} LKR upon arrival </b></p>}
                  </div >
                  <div className >
                    {this.state.sendDBroom !== null &&
                      <button className="btn btn-dark" style={{ float: "right" }} onClick={this.props.history.goBack}> Edit </button>
                    }
                  </div>
                </div>
              </div>
            </div>


            {this.state.sendDBroom && this.state.count<2 && (user ? (<>
              <div className="col-12 d-flex justify-content-center mt-5 " style={{ marginBottom: "50px" }}>
                <button className="btn btn-dark btn-lg" onClick={this.bookRoom}>
                  Proceed with the Booking!
                </button>
              </div>
            </>) : (
              <div>
                <h4 class="text-white mt-4" align="center">You have to be logged into place a booking!</h4>
                <div className="col-12 d-flex justify-content-center mt-2 " style={{ marginBottom: "50px" }}>
                  <button className="btn btn-dark btn-lg" onClick={() => {
                    this.props.history.push({
                      pathname: '/login',
                    })
                  }}>
                    Log in!
                  </button>
                </div>
              </div>))}

            {this.state.sendDBroom ? "" : <div className="col-12 d-flex justify-content-center mt-5"  >
              <button className="btn btn-dark btn-lg" onClick={this.props.history.goBack}>
                Click here to check other dates!
              </button>
            </div>
            }

            {this.state.count>=2 ? 
            <div className="col-12 d-flex justify-content-center mt-5"  >
              <button className="btn btn-dark btn-lg" onClick={this.props.history.goBack}>
                Go back
              </button>
              </div>
              : ""}

          </div>
        </section >
      </div >
    );
  }
}

export default RoomAvailibilty;
