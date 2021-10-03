import React, { Component } from "react";
import BookingScreen from "./BookingScreen";
import { Link } from "react-router-dom";
import axios from "axios";
import "./BookingScreen.css";

import AOS from 'aos';
import 'aos/dist/aos.css';

var moment = require("moment");

AOS.init({
  duration : 500
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
      isSuccess :false,
      userId : localStorage.getItem("_id")
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
      this.checkRoomAvailability();
    } catch (error) {
      console.log(error);
    }

    let x = localStorage.getItem("_id");
    console.log(x)
    
  }

  async bookRoom() {
    const bookingDetails = {
      room: this.state.sendDBroom,
      userId : this.state.userId,
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
      ).then( this.setState({
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
      //using histort to navigate to booking succ page
      

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

    const totalAmount = totalDays * 5000;
    this.setState({
      totalAmount: totalAmount,
    });

    let rooms = this.state.roomDB;
    let roomSelect = [];
    let selectedRoom = [];
    let availability = false;
    let flag  =false;


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
            }else{
              availability = false;
              flag =true;
            }
          }
        }
      }
      if ((availability === true && flag ==false) || e.currentbookings.length === 0) {
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
  }

  render() {
    
    //console.log(this.state.roomDB)
    if(this.isSuccess==true){
      this.props.history.push({
        pathname: '/booking/BookingAvailability/BookingConfirmation',
        state: this.state,
      });
    }

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
                    {this.state.sendDBroom ? (
                      <h2>Selected Dates are Available!</h2>
                    ) : (
                      <h2>Selected Dates are Not Available!</h2>
                    )}

                    <p className="lead">
                      Check in : {this.state.fromDate} | Check out :{" "}
                      {this.state.toDate}
                    </p>
                    <p className="lead">Total Days {this.state.totalDays}</p>
                    <p className="lead">Room type: {this.state.roomType} </p>
                    <p className="lead">Basis: {this.state.basis} </p>
                  </div >
                  <div className >
                  {this.state.sendDBroom !==null &&
                    <button className = "btn btn-dark" style = {{float: "right"}} onClick = {this.props.history.goBack}> Edit </button>
                  }
                </div>
                </div>
              </div>
            </div>

            {this.state.sendDBroom ? (
              <div className="col-12 d-flex justify-content-center mt-5 ">
                <button className="btn btn-dark btn-lg" onClick={this.bookRoom}>
                  Proceed with the Booking!
                </button>
              </div>
            ) : (
              <div className="col-12 d-flex justify-content-center mt-5">
                
                  <button className="btn btn-dark btn-lg" onClick ={this.props.history.goBack}>
                    Click here to check other dates!
                  </button>
                
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default RoomAvailibilty;
