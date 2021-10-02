import React, { Component } from "react";
import './Admin.css';
import './AdminBtn.scss';
import axios from "axios";
import './Clock'
import Clock from "./Clock";
import {Link} from 'react-router-dom';

class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetchLast: [],
            fetchTotal: [],
        }

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




    render(){
       

        const { fetchLast, fetchTotal } = this.state;

        const LastID = fetchLast.invoiceID;
        const LastInvoiceName = fetchLast.billingName;
        const LastMobileNum = fetchLast.mobileNumber;
        const LastInvoiceAmount = fetchLast.totalAmount;
        const NumOfInvoices = fetchTotal;

        return(
            

            <div className="container" style={{marginTop:"100px"}}>
            
              <div style={{width:"10%"}}>
              
                <img src="https://res.cloudinary.com/srigemunuwebapp/image/upload/v1633170412/showcaseskills_w3rjr6.gif" class="img-fluid" alt="Responsive image"/>
                
                
                </div>
                <h1 style={{marginTop:"-51px", marginLeft:"145px", }}>Admin Panel</h1>

<br></br>
<br></br>
                {/* ////////////___import cards____////////// */}
                
<div class="container">
    <div class="row">
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-blue order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Orders Received</h6>   
                    <h2 class="text-right"><span>486</span></h2>
                    <p class="m-b-0">Completed Orders<span class="f-right">351</span></p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-green order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Orders Received</h6>
                    <h2 class="text-right"><span>486</span></h2>
                    <p class="m-b-0">Completed Orders<span class="f-right">351</span></p>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-yellow order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Recent Invoice</h6>
                    <h2 class="text-right"><span>{LastID}</span></h2>
                    <p class="m-b-0">Name:<span class="f-right">{LastInvoiceName}</span></p>
                    
                </div>
                
            </div>
        </div>
        
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-pink order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Total Revenue</h6> 
                    <h2 class="text-right"><span>980,000LKR</span></h2>
                    <p class="m-b-0">Issued Invoices<span class="f-right">{"0"+NumOfInvoices}</span></p>
                </div>
            </div>
        </div>
	</div>
</div>
{/* ////////////___end of the import cards____////////// */}  
                <br></br>

                
{/* ////////////___import button cards____////////// */}  

                <div class="container">
  <div class="row">
    <div class="col order-last">
      







    <div class="containerBtnCard">

<div class="card">
  <div class="face face1">
    <div class="content">
      <span class="stars"></span>
      <h5 class="java">Manage Income</h5>
      
      <Link to="/admin/revenue" type="button" class="btn btn-outline-light">Manage</Link>
    </div>
  </div>
  <div class="face face2">
    <h5 style={{marginLeft:"20px"}}>Revenue Management</h5>
  </div>
</div>


</div>







    </div>
    <div class="col">
      
      






    <div class="containerBtnCard">

<div class="card">
  <div class="face face1">
    <div class="content">
      <span class="stars"></span>
      <h5 class="java">Manage Rooms</h5>
      
      <Link to="#" type="button" class="btn btn-outline-light">Manage</Link>
    </div>
  </div>
  <div class="face face2">
    <h5 style={{marginLeft:"20px"}}>Room Management</h5>
  </div>
</div>


</div>







    </div>
    <div class="col order-first">
      







    <div class="containerBtnCard">

<div class="card">
  <div class="face face1">
    <div class="content">
      <span class="stars"></span>
      <h5 class="java">Manage Bookings</h5>
      
      <Link to="#" type="button" class="btn btn-outline-light">Manage</Link>
    </div>
  </div>
  <div class="face face2">
    <h5 style={{marginLeft:"20px"}}>Booking Management</h5>
  </div>
</div>


</div>






    </div>
  </div>
</div>


{/* /////////////////////2nd row of cards/////////// */}

<div class="container">
  <div class="row">
    <div class="col order-last">
      







    <div class="containerBtnCard">

<div class="card">
  <div class="face face1">
    <div class="content">
      <span class="stars"></span>
      <h5 class="java">Manage Restaurant</h5>
      
      <Link to="#" type="button" class="btn btn-outline-light">Manage</Link>
    </div>
  </div>
  <div class="face face2">
    <h5 style={{marginLeft:"20px"}}>Restaurant Management</h5>
  </div>
</div>


</div>







    </div>
    <div class="col">
      
      






    <div class="containerBtnCard">

<div class="card">
  <div class="face face1">
    <div class="content">
      <span class="stars"></span>
      <h5 class="java">Manage Employee</h5>
      
      <Link to="#" type="button" class="btn btn-outline-light">Manage</Link>
    </div>
  </div>
  <div class="face face2">
    <h5 style={{marginLeft:"20px"}}>Employee Management</h5>
  </div>
</div>


</div>







    </div>
    <div class="col order-first">
      







    <div class="containerBtnCard">

<div class="card">
  <div class="face face1">
    <div class="content">
      <span class="stars"></span>
      <h5 class="java">Maintenance</h5>
      
      <Link to="#" type="button" class="btn btn-outline-light">Manage</Link>
    </div>
  </div>
  <div class="face face2">
    <h5 style={{marginLeft:"20px"}}>Hotel<br/>Maintenance</h5>
  </div>
</div>


</div>






    </div>
  </div>
</div>






<br></br>
<br></br>





            </div>
        )
    }


}

export default Admin