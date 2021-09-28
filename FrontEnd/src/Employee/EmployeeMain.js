import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../resources/banner2blur.jpg";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home2" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer2">
        <h1> Employee Management Page </h1>
        <Link to="Employee/AddEmployee.js">
          <button> Add Employee </button>
        </Link>
        <Link to="Employee/GetEmployee.js">
          <button> View Employee </button>
        </Link>
        <Link to="Employee/EditEmployee.js">
          <button> Edit and Delete </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;