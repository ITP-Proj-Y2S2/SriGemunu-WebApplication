import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../resources/bannerEmp.jpg";
import "../styles/EmployeeMain.css";
import Button from 'react-bootstrap/Button';

function Home() {
  return (
    <div className="home2" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainerEmp" >
        <h1> Employee Management Page </h1>
        <br/><br/>
        <Link to="/admin/employee/addEmp">
          <Button variant="flat" size="m"> Add Employee </Button>
        </Link>
        <br/><br/>
        <Link to="/admin/employee/getEmp">
          <Button variant="flat" size="m"> View Employee </Button>
        </Link>
        <br/><br/>
        <Link to="/admin/employee/editEmp">
          <Button variant="flat" size="m"> Availability </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;