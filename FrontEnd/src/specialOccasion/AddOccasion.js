import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './EventDesign.css';
import axois from "axios";
import axios from "axios";
import moment from "moment";




export default function AddOccasion(props) {

    const [bookedDate, setDate] = useState(new Date());
    const [email, setEmail] = useState("")
    const [guests, setGuests] = useState("")
    const [time, setTime] = useState("")
    const [menu, setMenu] = useState("")
    const [type, setType] = useState(props.match.params.eventtype)
    const [userId, setUserId] = useState("")


    function sendData(e) {
        e.preventDefault();
        const newEvent = {
            guests,
            time,
            email,
            menu,
            type,
            bookedDate,
            userId
        }

        axios.post("http://localhost:8070/occasion/add", newEvent).then(() => {
            alert("Event added")
        }).catch((err) => {
            alert(err)
        })
    }

    useEffect( () => {
        try {
            const user = JSON.parse(localStorage.getItem("currentUser"))
            setUserId(user._id)
            console.log(userId)
    
        } catch (error) {
            console.log(error)
            
        }
      
    }, []) 





    return (


        <div className="bgimg textCenter ">
            <div className = "mt-5">
            <h1 className="display-1 fontcolor-white">Events</h1>
            <h5 className="fontcolor-white">Selected Event Type : {eventType}</h5>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="d-flex justify-content-end mt-5 fontcolor-white ">
                        <form>
                            <div className="mb-3">
                                <div class="input-group has-validation">
                                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                                    <input type="text" class="form-control" id="validationEmail" aria-describedby="inputGroupPrepend" required onChange={(e) => {
                                        setEmail(e.target.value)
                                    }
                                    } />
                                    <div class="invalid-feedback">
                                        Please enter the email.
                                    </div>
                                </div>
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label for="guests" className="form-label">Number of Guests</label>
                                <input type="text" className="form-control" id="guests" onChange={(e) => {
                                    setGuests(e.target.value)
                                }
                                } />
                            </div>
                            <div className="mb-3">
                                <label for="time" className="form-label">time</label>
                                <input type="text" className="form-control" id="time" onChange={(e) => {
                                    setTime(e.target.value)
                                }
                                } />
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="menu" id="flexRadioDefault1" value="Menu1" onChange={(e) => {
                                    setMenu(e.target.value)
                                }
                                } />
                                <label className="form-check-label" for="flexRadioDefault1">
                                    MENU 1
                                    <p className="lead">
                                        1000LKR Per per plate
                                    </p>
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="menu" id="flexRadioDefault2" value="Menu2" onChange={(e) => {
                                    setMenu(e.target.value)
                                }
                                } />
                                <label className="form-check-label" for="flexRadioDefault2">
                                    MENU 2
                                    <p className="lead">
                                        2000LKR Per per plate
                                    </p>
                                    <div class="col-12">
                                        <button class="btn btn-primary m-3" type="submit" onClick={sendData}>Submit form</button>
                                    </div>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-6 col align-self-center fontcolor-white ">
                    <div class="">
                        <h3 className="text-white">Select a Date</h3>
                        <DatePicker selected={bookedDate} onChange={(date) => setDate(date)} className="text-dark" />
                    </div>
                </div>
            </div>
        </div>
    )
}