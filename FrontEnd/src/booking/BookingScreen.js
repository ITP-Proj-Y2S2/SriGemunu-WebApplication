import React, { Component } from "react";
import { Link } from "react-router-dom";
import './BookingScreen.css';
import image4 from '../Assets/image4.jpg'
import hotelBG from '../Assets/hotelBG.jpg'
import cov1 from '../Assets/temp1.jpg'
import cov2 from '../Assets/temp2.jpg'
import cov3 from '../Assets/temp3.jpg'
import room1 from '../Assets/room1.png'

import AOS from 'aos';
import 'aos/dist/aos.css';


import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';

import moment from "moment";

const { RangePicker } = DatePicker;

AOS.init({
    duration : 750
  });


class BookingScreen extends Component {

    constructor() {
        super();
        this.state = {
            name: "Form"
        };
        this.onValueChangeRoom = this.onValueChangeRoom.bind(this);
        this.onValueChangeBasis = this.onValueChangeBasis.bind(this);
        this.filterByDate = this.filterByDate.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    onValueChangeRoom(event) {
        this.setState({
            selectedOptionRoom: event.target.value
        });
    }

    onValueChangeBasis(event) {
        this.setState({
            selectedOptionBasis: event.target.value
        });
    }

    formSubmit(event) {
        event.preventDefault();
        // console.log(this.state.selectedOptionRoom)
        // console.log(this.state.selectedOptionBasis)     
        // console.log(this.state);
    }

    filterByDate(dates) {
        // console.log(moment(dates[0]).format('DD-MM-YYYY'))
        // console.log(moment(dates[1]).format('DD-MM-YYYY'))
        this.setState({
            fromDate: moment(dates[0]).format('DD-MM-YYYY'),
            toDate: moment(dates[1]).format('DD-MM-YYYY')
        });
        //   console.log(this.state.toDate)
    }

    render() {

        return (
    <div >
    <  div className="bgimg pb-5 pt-5" data-aos ="fade-down">
        <form onSubmit={this.formSubmit} >
        <section className="clean-block clean-blog-list dark">
            <div className="container">
                <div className="text-center block-heading ">
                    <h1 className="display-1 text-white pt-5">Reservation</h1>
                </div>
                <div>
                    <div className="m-5">
                        <div className="row justify-content-center">
                            <div className="col-3 m-5"  data-aos="fade-right"><img className="rounded img-fluid" src={cov3} alt="" /></div>
                            <div className="col-3 m-5" data-aos="fade-down"><img className="rounded img-fluid" src={cov2} alt="" /></div>
                            <div className="col-3 m-5"  data-aos="fade-left"><img className="rounded img-fluid" src={cov1} alt="" /></div>
                        </div>
                    </div>
                </div>
                <div className="container" >
                  <div className="row" >
                    <div className="block-content col-6 " style={{ opacity: "0.9" }} >
                        <h3 className="text-center mb-2">Select your room type</h3>
                        <div className="clean-blog-post mt-5">
                            <div className="row">
                                <div className="col-lg-5 align-self-center"><img className="rounded img-fluid" src={room1} alt="" /></div>
                                <div className="col-lg-7">
                                    <h5>Deluxe Room</h5>
                                    <div className="info"></div>
                                    <p>1 x Double Bed<br />Fits 2 adults</p>

                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" id="formCheck-1" value="Deluxe" checked={this.state.selectedOptionRoom === "Deluxe"}
                                            onChange={this.onValueChangeRoom} /><label className="form-check-label" htmlFor="formCheck-1">Select Room</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="clean-blog-post mt-5">
                            <div className="row">
                                <div className="col-lg-5 align-self-center"><img className="rounded img-fluid" src={room1} alt="" /></div>
                                <div className="col-lg-7">
                                    <h5>King Room</h5>
                                    <div className="info"></div>
                                    <p>2 x Double Bed<br />Fits 3 adults<br /><br /></p>
                                    <div className="form-check"><input className="form-check-input" type="radio" id="formCheck-2" value="King" checked={this.state.selectedOptionRoom === "King"} onChange={this.onValueChangeRoom} />
                                        <label className="form-check-label" htmlFor="formCheck-2">Select Room</label></div>
                                </div>
                                <div>
                                    Selected option is : {this.state.selectedOptionRoom}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="block-content col-6 " style={{ opacity: "0.9" }}>
                        <h3 className="text-center mb-2">Select your duration of stay</h3>
                        <div>
                            <div className="clean-blog-post mt-5">
                                <div className="row">
                                    <div className="col d-flex justify-content-center mb-5">
                                        <RangePicker format='DD-MM-YYYY' onChange={this.filterByDate} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-center mb-2">Select your room basis</h3>
                        <div className="clean-blog-post">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="info">

                                        <div className="form-check mt-3"><input className="form-check-input" type="radio" id="formCheck-3" value="RoomOnly" checked={this.state.selectedOptionBasis === "RoomOnly"}
                                            onChange={this.onValueChangeBasis} /><label className="form-check-label" htmlFor="formCheck-3" >Room Only</label></div>

                                        <div className="form-check mt-3"><input className="form-check-input" type="radio" id="formCheck-4" value="BB" checked={this.state.selectedOptionBasis === "BB"}
                                            onChange={this.onValueChangeBasis} /><label className="form-check-label" htmlFor="formCheck-4" >Bread and Breakfast</label></div>

                                        <div className="form-check mt-3"><input className="form-check-input" type="radio" id="formCheck-5" value="FB" checked={this.state.selectedOptionBasis === "FB"}
                                            onChange={this.onValueChangeBasis} /><label className="form-check-label" htmlFor="formCheck-5" >Full Board</label></div>
                                    </div>
                                    <div>
                                        Selected option is : {this.state.selectedOptionBasis}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
                {this.state.selectedOptionRoom && this.state.selectedOptionBasis && this.state.fromDate && this.state.toDate ? (
                    <div className="text-center checkingbloc">
                        <Link to={`/booking/BookingAvailability/RoomAvailibilty/${this.state.selectedOptionRoom}/${this.state.selectedOptionBasis}/${this.state.fromDate}/${this.state.toDate}`}>
                            <button className="btn btn-light btn-lg text-start" type="submit" value="Submit" >Click Here to Check Availability !</button>
                        </Link>
                    </div>) : <div className="text-center checkingbloc">
                    <button className="btn btn-light btn-lg text-start" type="submit" value="Submit" disabled >Click Here to Check Availability !</button>
                </div>}
            </div>
        </section>
    </form>
</div>
</div>
        );
    }
}

export default BookingScreen
