//import React from "react";
import "./feedback.css"
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
const axios = require('axios').default;

class ViewFeedbacks extends React.Component {
    constructor(props) {
        console.log("IN  constructor()");
        super(props);
        this.state = {
            /* email: '',
            first: '',
            second: '',
            third: '',
            fourth: '',
            fifth: '',
            suggestion: '',  */
            formdata: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("IN  componentDidMount()");

    }
    componentDidUpdate() {
        console.log("IN  componentDidUpdate()");
        console.log("States -> " + JSON.stringify(this.state));
    }
    handleChange(event) {
        //this.setState({ email: event.target.value });
        let html_id = event.target.id;
        this.setState({ [event.target.id]: event.target.value });
        //this.setState({formdata:{[html_id]: event.target.value}});

        //this.setState({jsondata[event.target.id]: event.target.value})

        //this.setState({ jsondata.akey : "value" });

        console.log("IN handleChange");
        console.log("id param -> " + event.target.id);


        console.log(this.state);
    }

    handleSubmit(event) {
        //alert("States -> " + JSON.stringify(this.state));
        console.log(event.target)
        event.preventDefault();

        let tosend = (this.state);
        console.log("to send -> " + tosend);
        axios.post('http://localhost:4000/addfeedback', this.state)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    render() {

        return (
            <>
            <div className="container">
                <br />
                <br />
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        How did our front office staff behave during your stay?
                        <span class="badge bg-primary rounded-pill">Point 1</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        How did you find the overall cleanliness of our hotel?
                        <span class="badge bg-primary rounded-pill">Point 2</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        How did you find the cleanliness of your room?
                        <span class="badge bg-primary rounded-pill">Point 3</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        How was house keeping behaving during your stay?
                        <span class="badge bg-primary rounded-pill">Point 4</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        How was the ambiance of the hotel's restaurant?
                        <span class="badge bg-primary rounded-pill">Point 5</span>
                    </li>
                </ul>
                <br />
                <br />
            </div>
            <div className="container"> 
                <div class="table-responsive">
                    <table class="table table-bordered w-auto">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Point 1</th>
                                <th>Point 2</th>
                                <th>Point 3</th>
                                <th>Point 4</th>
                                <th>Point 5</th>
                                <th style={{width:"100px"}}>Comment</th>
                                <th>Date Posted</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>rumiradaksith123@gmail.com</td>
                                <td>Anna</td>
                                <td>Very Satisfied	</td>
                                <td>Satisfied</td>
                                <td>Unsatisfied</td>
                                <td>Very Unsatisfied</td>
                                <td>Satisfied</td>
                                <td>Feel free to add any other comments or suggestions:</td>
                                <td>January 1, 2021</td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
            
            </div>
            </>
        );
    }
}

export default ViewFeedbacks;
