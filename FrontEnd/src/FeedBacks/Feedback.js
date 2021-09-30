//import React from "react";
import "./feedback.css"
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
const axios = require('axios').default;

class Feedback extends React.Component {
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
            formdata:[],
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
        this.setState({formdata:{[html_id]: event.target.value}});
        
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

            <div className="container">

                <div class="alert alert-success alert-dismissible fade show">
                </div>
                <div class="testbox">
                    <form onSubmit={this.handleSubmit} >
                        <h1>Online Feedback Form</h1>
                        <p>
                            Thank you for taking the time to fill in our online feedback form.
                            By providing us your feedback, you are helping us understand what we
                            do well and what improvements we need to implement.
                        </p>

                        <h4>
                            Email<span>*</span>
                        </h4>
                        <input id="email" type="text" onChange={this.handleChange} value={this.state.email} required />
                        <h4>
                            How satisfied were you with:<span>*</span>
                        </h4>
                        <table onChange={this.handleChange}>
                            <tr>
                                <th class="first-col"></th>
                                <th>Very Satisfied</th>
                                <th>Satisfied</th>
                                <th>Unsatisfied</th>
                                <th>Very Unsatisfied</th>
                            </tr>

                            <tr>
                                <td class="first-col">How did our front office staff behave during your stay?</td>

                                <td>
                                    {" "}
                                    <input id="first" type="radio" value="0" name="point#1" required />{" "}
                                </td>
                                <td>
                                    {" "}
                                    <input id="first" type="radio" value="1" name="point#1" required />{" "}
                                </td>
                                <td>
                                    {" "}
                                    <input id="first" type="radio" value="2" name="point#1" required />{" "}
                                </td>
                                <td>
                                    {" "}
                                    <input id="first" type="radio" value="3" name="point#1" required />{" "}
                                </td>

                            </tr>

                            <tr>
                                <td class="first-col">How did you find the overall cleanliness of our hotel?</td>
                                <td>
                                    <input id="second" type="radio" value="0" name="point#2" required />
                                </td>
                                <td>
                                    <input id="second" type="radio" value="1" name="point#2" required />
                                </td>
                                <td>
                                    <input id="second" type="radio" value="2" name="point#2" required />
                                </td>
                                <td>
                                    <input id="second" type="radio" value="3" name="point#2" required />
                                </td>
                            </tr>
                            <tr>
                                <td class="first-col">How did you find the cleanliness of your room?</td>
                                <td>
                                    <input id="third" type="radio" value="0" name="point#3" required />
                                </td>
                                <td>
                                    <input id="third" type="radio" value="1" name="point#3" required />
                                </td>
                                <td>
                                    <input id="third" type="radio" value="2" name="point#3" required />
                                </td>
                                <td>
                                    <input id="third" type="radio" value="3" name="point#3" required />
                                </td>
                            </tr>
                            <tr>
                                <td class="first-col">How was house keeping behaving during your stay?</td>
                                <td>
                                    <input id="fourth" type="radio" value="0" name="point#4" required />
                                </td>
                                <td>
                                    <input id="fourth" type="radio" value="1" name="point#4" required />
                                </td>
                                <td>
                                    <input id="fourth" type="radio" value="2" name="point#4" required />
                                </td>
                                <td>
                                    <input id="fourth" type="radio" value="3" name="point#4" required />
                                </td>
                            </tr>
                            <tr>
                                <td class="first-col">How was the ambiance of the hotel's restaurant?</td>
                                <td>
                                    <input id="fifth" type="radio" value="0" name="point#5" required />
                                </td>
                                <td>
                                    <input id="fifth" type="radio" value="1" name="point#5" required />
                                </td>
                                <td>
                                    <input id="fifth" type="radio" value="2" name="point#5" required />
                                </td>
                                <td>
                                    <input id="fifth" type="radio" value="3" name="point#5" required />
                                </td>
                            </tr>
                        </table>
                        <h4>Feel free to add any other comments or suggestions:</h4>
                        <textarea id="suggestion" class="textar" onChange={this.handleChange} required ></textarea>
                        <br />
                        <small>

                        </small>

                        <button type="submit" class="btn btn-primary btn-block" > Send Feedback </button>

                    </form>
                </div>
            </div>
        );
    }
}

export default Feedback;
