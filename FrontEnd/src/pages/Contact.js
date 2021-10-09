import React from "react";
import banneraabout from "../resources/banner4.jpg";
import "../styles/Contact.css";
import Sidebar from "../RestaurantComponents/Sidebar"
import { GiHamburgerMenu } from 'react-icons/gi'
import {useState} from 'react'

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration : 1500
});


function About() {
  const [ showSide,setshowSide] = useState(false);
  return (
    <div className="about">
      <div
        className="contacttop"
        style={{ backgroundImage: `url(${banneraabout})` }}
      ></div>
        <div className="sidebar">
        <header data-aos = "fade-right">
        <a><GiHamburgerMenu onClick={() => setshowSide(!showSide)}
        /></a>
        </header>
          <Sidebar show={showSide}/>
          </div>
      <div className="aboutBottom">
        <h1 data-aos = "fade-in"> Contact Us</h1>

        <h3 data-aos = "fade-right">For more information, inquiries and bookings, please contact:</h3>
        
        <h3 data-aos = "fade-left">Hotel Sri Gemunu Beach Resort</h3>
<h3 data-aos = "fade-up">Tel 1: +94-(0)91-2283202</h3>
<h3 data-aos = "fade-up">Tel 2: +94-(0)91-2283788</h3>
<h3 data-aos = "fade-up">Tel 3: +94-(0)91-4385022</h3>

<h3 data-aos = "fade-up">Fax: +94-(0)91-4380078</h3>

      </div>
    </div>
  );
}

export default About;
