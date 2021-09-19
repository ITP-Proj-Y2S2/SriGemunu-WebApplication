import React, { useState } from "react";
import App from "../App";
import { Link } from "react-router-dom";
import Wedding from "../Assets/wedding.jpg";
import Party from "../Assets/party.jpg";
import Conference from "../Assets/conference.jpg";
import './EventDesign.css';



export default function OccasionType() {

    return (
        <div className = "bgimg textCenter">
            <div className="d-flex justify-content-center p-2ml-10"></div>
            <h1 className="display-1 mt-5 fontcolor-white" >Book your event</h1>

            <div className="row mt-5">
                <div className="d-flex justify-content-center">
                    <div className="col-5 card d-flex justify-content-center p-2 " >
                        <img className="card-img-top" src={Wedding} alt="" />
                        <div className="card-body">
                            <h5 className="card-title">Wedding</h5>
                            <p className="card-text">Indoor/Outdoor options available, We will be serving a free Iced coffee.</p>
                        </div>
                        <div className="card-body">
                            <Link to={"/specialoccasion/OccasionHome/OccasionType/AddOccasion/Wedding"} className="btn btn-primary">Book</Link>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <div className="row">
            <div className="d-flex justify-content-center">
                <div className="col-5 card d-flex justify-content-center p-2 ml-10" >
                    <img className="card-img-top" src={Party} alt="" />
                    <div className="card-body">
                        <h5 className="card-title">Party</h5>
                        <p className="card-text">Our venue can be booked for any type of parties, a free welcome juice will be served.</p>
                    </div>
                    <div className="card-body">
                        <Link to={"/specialoccasion/OccasionHome/OccasionType/AddOccasion/Party"} className="btn btn-primary">Book</Link>
                    </div>
                </div>
            </div>
            </div>
            <br/>

            <div className="row">
                <div className="d-flex justify-content-center">
                    <div className=" col-5 card d-flex justify-content-center p-2 ml-10" >
                        <img className="card-img-top" src={Conference} alt="" />
                        <div className="card-body">
                            <h5 className="card-title">Conference</h5>
                            <p className="card-text">Air conditioned conference rooms available for your official work</p>
                        </div>
                        <div className="card-body">
                            <Link to={"/specialoccasion/OccasionHome/OccasionType/AddOccasion/Conference"} className="btn btn-primary">Book</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}