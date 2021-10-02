import React, { Component } from "react";
import './Admin.css';
import axios from "axios";

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
                

            </div>
        )
    }


}

export default Admin