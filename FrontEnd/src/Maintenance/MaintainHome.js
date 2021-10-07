import React, {useState} from "react"
import { Link } from "react-router-dom";
// import '../css/styles.css';
// import '../js/scripts'

export default function MaintainHome(){

    return(
                
        <div className="container">

        <div>
        <header class="masthead">
            <div class="container px-4 px-lg-5 h-100">
                <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                    <div class="col-lg-8 align-self-end">
                        <h1 class="text-white font-weight-bold">Hi John Doe</h1>
                        <hr class="divider" />
                    </div>
                    <div class="col-lg-8 align-self-baseline">
                        <p class="text-white-75 mb-5">Sri Gemunu will solve your problem as soon as possible</p>
                        <a class="btn btn-primary btn-xl" href="form">Request Maintenance</a>
                        <br></br>
                        <br></br>
                        <br></br>
                        <a class="btn btn-primary btn-xl" href="yourposts">Your Posts</a>
                    </div>
                </div>
            </div>
        </header>
        </div>

            <section class="page-section" id="services">
            <div class="container px-4 px-lg-5">
                <h2 class="text-center mt-0">At Your Service</h2>
                <hr class="divider" />
                <div class="row gx-4 gx-lg-5">
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <div class="mb-2"><i class="bi-gem fs-1 text-primary"></i></div>
                            <h3 class="h4 mb-2">Best Service</h3>
                            <p class="text-muted mb-0">Highly qualified individuals are ready to help you</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <div class="mb-2"><i class="bi-laptop fs-1 text-primary"></i></div>
                            <h3 class="h4 mb-2">Stay connected</h3>
                            <p class="text-muted mb-0">The website is available whenever, wherever for your benefit</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <div class="mb-2"><i class="bi-globe fs-1 text-primary"></i></div>
                            <h3 class="h4 mb-2">World class service</h3>
                            <p class="text-muted mb-0">Top notch service will be provided, guaranteed.</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <div class="mb-2"><i class="bi-heart fs-1 text-primary"></i></div>
                            <h3 class="h4 mb-2">Always here for you</h3>
                            <p class="text-muted mb-0">24/7 Maintenance crew will be at your door whenever you need us</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}