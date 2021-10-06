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
        <h1> ABOUT US</h1>
        <p>
        Sri Lanka, pearl of the Indian ocean, is often called the “Garden of Eden”. Our hotel is situated on the southern tip of this paradise.
We welcome you with the hospitality typical of our country, coupled with a special service and a unique informal flair.
The well-kept house occupies the best location on the border of the small village of Unawatuna and offers a fascinating view of the Indian ocean from every room.
Secured by an offshore coral reef our beach offers secure swimming in the Indian ocean. Undisturbed walks along the beach and through the countryside, the encounter of our ancient culture and much more ensure an unforgettable experience.
</p>

<p>Our restaurant offers a range of Asian and international specialities à-la-carte, daily from 7 a.m. – 10 p.m.

Interesting breakfast variations, exotic fruits and exquisite curries guarantee a culinary experience out of the ordinary. Fish, lobster and other sea food are daily supplied by local fishermen, fresh from the ocean.

Occasionally we offer barbecues and buffet-nights with life music and life events. Our friendly service and superb food will make your stay an unforgettable one.
        </p>
      </div>
    </div>
  );
}

export default About;
