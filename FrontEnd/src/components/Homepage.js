import React from "react";
import { Link } from "react-router-dom";
import homeimage from "../Assets/home2.jpg";
import "./Homepage.css";

function Home() {
  return (
    <div className="home fill-window" style={{ backgroundImage: `url(${homeimage})` }}>
      <div className="headerContainer">
        <div className = "row">
        <div className = "col-12 text-center">
        <h1 > Welcome to Sri Gemunu Beach Resort</h1>
        <h2>The Best on the Beach.....</h2>
        <Link to="/booking/BookingAvailability">
          <button className ="mt-3"> BOOK NOW </button>
        </Link> 
        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
