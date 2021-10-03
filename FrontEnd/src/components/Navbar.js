import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'


function Navbar({ history}) {
    const user = JSON.parse(localStorage.getItem("currentUser"))

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("_id");
        localStorage.removeItem("currentUser");
        window.location.href = "/login"
       
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Sri Gemunu</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse " id="navbarSupportedContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/booking/BookingAvailability" className="nav-link">Bookings</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/specialoccasion/OccasionHome" className="nav-link">Events</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/restaurant/" className="nav-link">Restaurant</Link>
                        </li>

                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Restaurant</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li> */}
                    </ul>

                    {user ? (<>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {user.cusname}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" href="/user/userprofile" >Profile</a></li>
                                <li><a class="dropdown-item" href="#" onClick = {logoutHandler}>Logout</a></li>
                                
                            </ul>
                        </div>
                    </>) : (
                        <div className="d-flex ">
                            <a className="nav-link" href="/register">Register</a>
                            <a className="nav-link" href="/login">Login</a>
                        </div>)}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
