import React from "react";
import banneraabout from "../resources/banner4.jpg";
import "../styles/About.css";
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
        className="aboutTop"
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
        <h1> Contact Us</h1>

        <form id="contact-form" method="POST">
          <label htmlFor="name">Full Name</label>
          <input name="name" placeholder="Enter full name..." type="text" />
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Enter email..." type="email" />
          <label htmlFor="message">Message</label>
          <textarea
            rows="6"
            placeholder="Enter message..."
            name="message"
            required
          ></textarea>
          <button type="submit"> Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default About;
