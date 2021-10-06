import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../resources/banner2blur.jpg";
import Sidebar from "../RestaurantComponents/Sidebar"
import { GiHamburgerMenu } from 'react-icons/gi'
import {useState} from 'react'
import "../styles/Home.css";

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration : 1500
});

function Home() {
  const [ showSide,setshowSide] = useState(false);
  return (
    <div className="home2" data-aos = "fade-in" data-aos-duration="1200" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="sidebar">
        <header data-aos = "fade-right">
        <a><GiHamburgerMenu onClick={() => setshowSide(!showSide)} 
        /></a>
        </header>
          <Sidebar show={showSide}/>
          </div>
      <div className="headerContainer2">
        <h1 data-aos = "fade-up"> IT'S TIME TO INDULGE </h1>
        <Link to="/restaurant/menu">
          <button data-aos = "fade-down"> EXPLORE </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
