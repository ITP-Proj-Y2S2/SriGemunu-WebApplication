import React, { Component } from "react";
import axios from "axios";
import CounterClass from "./CounterClass";
import Motion from "./Motion";
import RevenueHome from "./RevenueHome.module.scss";
import {Link} from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchLast: [],
      fetchTotal: [],

      
      
    };
  }



  componentDidMount() {
    axios
      .get("http://localhost:8070/invoice/view/last")
      .then((response) => {
        console.table(response.data);
        this.setState({ fetchLast: response.data });
        
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMsg: "something went wrong with invoices" });
      });

  
    axios
      .get("http://localhost:8070/invoice/view/count")
      .then((response) => {
        //const xxy = response.data;
        console.log(response.data)
        this.setState({ fetchTotal: response.data });
        
       
        
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMsg: "something went wrong with invoices" });
      });

      
  }

  render() {



    const { fetchLast, fetchTotal, errorMsg } = this.state;
    

    //const LastData = JSON.stringify((posts[posts.length-1])) ;
    //const fetchLastData = JSON.parse(LastData);
    const LastID = fetchLast.invoiceID;
    const LastInvoiceName = fetchLast.billingName;
    const LastMobileNum = fetchLast.mobileNumber;
    const LastInvoiceAmount = fetchLast.totalAmount;
    const NumOfInvoices = fetchTotal;


    return (
      
      <div className="container">
        <br></br>
        <h1>
          <span class="badge bg-secondary">Revenue Management Dashboard</span>
        </h1>
        <br></br>
        
        

        <div class="card-group">
          {/* <div class="card border-dark mb-3" style={{ maxWidth: "18rem" }}>
            <div class="card-header">Total Invoices</div>
            <div class="card-body text-dark">
              <h5 class="card-title">Issued Invoices</h5>
              <h1 className="display-4" style={{ color: "#393939" }}>
                {"0" + NumOfInvoices}
              </h1>

              <div style={{ color: "#27a844" }}>
                <div class="spinner-grow spinner-grow-sm" role="status"></div>
              </div>
            </div>
          </div> */}

          <div class="col-md-4 col-xl-3">
            <div className="card bg-c-revenuePage order-card">
                <div class="card-block">
                    <h6 class="m-b-20" style={{color:"white"}}>Total Invoices</h6>   
                    <h2 class="text-right" style={{color:"white", fontSize:"70px"}}><span>{"0" + NumOfInvoices}</span></h2>
                    <div style={{ color: "#27a844", marginTop:"50px"}}>
                <div class="spinner-grow spinner-grow-sm" role="status"></div>
              </div> <br/>
              
                </div>
            </div>
        </div>

          <br></br>
 


          <div class="col-md-4 col-xl-3" style={{ maxWidth: "18rem", marginLeft: "30px" }}>
            <div class="card bg-c-revenuePage order-card">
                <div class="card-block">
                    <h6 class="m-b-20" style={{color:"white"}}>Recent Invoice</h6>   
                    <h2 class="text-right" style={{color:"white"}}><span>{"ID:" + LastID}</span></h2>
                    <p class="card-text"> {"Name:"+" "+LastInvoiceName}</p>
                    <p class="card-text"> {"Contact:"+" "+LastMobileNum}</p>
                    <button style={{fontSize:"18px", marginTop:"7px"}} class="btn btn-secondary btn-lg" disabled> {"Amount:"+" "+LastInvoiceAmount+"LKR"}</button>
              
                </div>
            </div>
        </div>


          <br></br>


          <div class="col-md-4 col-xl-3" style={{ maxWidth: "18rem", marginLeft: "30px" }}>
            <div class="card bg-c-revenuePage order-card">
                <div class="card-block">
                    <h6 class="m-b-20" style={{color:"white"}}>Payments</h6>   
                    <h2 class="text-right" style={{color:"white"}}><span>{"Total Revenue"}</span></h2>
                    <p class="card-text"> {"05 Crores"}</p>
                    <br/> <br/> <br/> <br/>
              
                </div>
            </div>
        </div>


        </div>


        {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
        <div>
        <Link to="/admin/revenue/add" type="button" class="btn btn-outline-dark btn-lg" >Issue Invoice</Link>
        
        <Link to="/admin/revenue/ViewInvoice" type="button" class="btn btn-outline-dark  btn-lg" style={{marginLeft:"30px"}}>Manage Invoices</Link>

        <Link to="#" type="button" class="btn btn-warning btn-lg" style={{marginLeft:"30px"}}>Generate Report</Link>
        </div>
        

        <br/><br/><br/>
        
      </div>
      
    );
  }
}

export default Home;
