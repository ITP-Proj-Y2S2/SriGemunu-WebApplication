import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../resources/banner2blur.jpg";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home2" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer2">
        <h1> IT'S TIME TO INDULGE </h1>
        <Link to="/restaurant/cusretr">
          <button> ORDER NOW </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
