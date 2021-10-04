import React from "react";
import { Link } from "react-router-dom";
import homeimage from "../Assets/home2.jpg";
import "./Homepage.css";
import { duration } from "moment";

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration : 1500
});

function Home() {
  return (
    <div className="home fill-window" style={{ backgroundImage: `url(${homeimage})` }}>
      <div className="headerContainer">
        <div className = "row">
        <div className = "col-12 text-center">
        <h1 data-aos = "zoom-in" style = {{fontSize :"100px"}}> Welcome to Sri Gemunu Beach Resort</h1>
        <h2 data-aos = "zoom-out" style = {{fontSize :"40px"}}>The Best on the Beach.....</h2>
        <Link to="/booking/BookingAvailability">
          <button className ="mt-5"> BOOK NOW </button>
        </Link> 
        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
