import React, { Component } from "react";
import axios from 'axios';
import CustomerTableRow from './CustomerTableRow';
import Sidebar from "../RestaurantComponents/Sidebar"
import { GiHamburgerMenu } from 'react-icons/gi'
import {useState} from 'react'
import { Link } from 'react-router-dom';
import "../styles/CustomerRetr.css";
import { AiFillHome } from "react-icons/ai"
import Button from 'react-bootstrap/Button';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration : 1500
});

export default class CustomerRetr extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
      this.retrieveItems();
  }

  retrieveItems() {
    axios.get('http://localhost:8070/restaurant/display').then(res => {
        this.setState({
          items: res.data
        });
    
      console.log(this.state.items)
    });
  }

  DataTable() {
    return this.state.items.map((items, i) => {
      return <CustomerTableRow obj={items} key={i} />;
    });
  }

  render() {
    return ( 
    <div className="container">
      
      <div className="cusdisplay">
    <h1 class=" mb-4" data-aos = "fade-right"> IT'S TIME TO INDULGE </h1>
    <table class="menutable" data-aos="fade-up"
     data-aos-duration="1500">
      <thead>
          <th>Food Item</th>
          <th>Catergory</th>
          <th>Price</th>
      </thead>
      <tbody>
        {this.DataTable()}
      </tbody>
    </table>
    <div className="homebuttn" >
    < Link to={"/restaurant/"}><Button variant="light" data-aos = "fade-left" size="m" ><AiFillHome /></Button></Link>
    </div>
  </div>
  </div>);
  }
}
