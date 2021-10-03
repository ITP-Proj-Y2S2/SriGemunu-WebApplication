import React, { useState } from "react";
import Logo from "../resources/newlogo.png";
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import "../styles/RestNavbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} />
        <div className="hiddenLinks">
          <Link to="/"> HOME </Link>
          <Link to="/restaurant/menu"> MENU </Link>
          <Link to="/restaurant/about"> ABOUT </Link>
          <Link to="/restaurant/contact"> CONTACT </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/"> HOME </Link>
        <Link to="/restaurant/menu"> MENU </Link>
        <Link to="/restaurant/about"> ABOUT </Link>
        <Link to="/contact"> CONTACT </Link>
        <button onClick={toggleNavbar}>
          <ReorderIcon/>
        </button>
      </div>
    </div>
  );
}

export default Navbar;



