import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./BookingScreen.css";

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration : 500
});


export default class BookingConfirmation extends Component {
    constructor(props){
        super(props)
        this.state = this.props.location.state;
    }


    render() {
      const user = JSON.parse(localStorage.getItem("currentUser"))

        return (
            <div className="bgimg p-5" data-aos ="fade-down">
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
                    {this.state.isSuccess ==true ? (
                      <h2>Hello {user.cusname}! <br/> Your Booking is Successful !</h2>
                    ) : (
                      <h2>Booking Unsuccessful!</h2>
                    )}

                    <p className="lead">
                      Check in : {this.state.fromDate} | Check out :{" "}
                      {this.state.toDate}
                    </p>
                    <p className="lead">Total Days {this.state.totalDays}</p>
                    <p className="lead">Room type:{ this.state.roomType == "King" ? "  King Room" : this.state.roomType == "Deluxe" ?  " Deluxe Room" : ""}  </p>
                    <p className="lead">Basis: { this.state.basis == "RoomOnly" ? " Room Only" : this.state.basis == "BB" ?  " Bed and Breakfast" :this.state.basis == "FB" ? "  Full board" : ""} </p>
                    <p className="h5"><b>Pay {this.state.totalAmount} LKR upon arrival </b></p>
                  </div>
                </div>
              </div>
            </div>

            {this.state.isSuccess ==false ? (
              <div className="col-12 d-flex justify-content-center mt-5 ">
                <button className="btn btn-dark btn-lg" onClick={() => {
                  this.props.history.push("/booking/BookingAvailability/");
                }}>
                  Try again!
                </button>
              </div>
            ) : (
              <div className="col-12 d-flex justify-content-center mt-5">
                
                  <button className="btn btn-dark btn-lg" onClick={() => {
                  this.props.history.push("/booking/BookingAvailability/");
                }}>
                    Click here to place another booking!
                  </button>
                
              </div>
            )}
          </div>
        </section>
      </div>
        )
    }
}
