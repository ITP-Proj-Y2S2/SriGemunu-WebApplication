import React, { Component } from "react";
import axios from "axios";
import CounterClass from "./CounterClass";
import Motion from "./Motion";

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
          <div class="card border-dark mb-3" style={{ maxWidth: "18rem" }}>
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
          </div>

          <br></br>
          <div
            class="card border-dark mb-3"
            style={{ maxWidth: "18rem", marginLeft: "30px" }}
          >
            <div class="card-header">Recent Invoice </div>
            <div class="card-body text-dark">
              <h5 class="card-title">{"ID:"+" "+LastID}</h5>
              <p class="card-text"> {"Name:"+" "+LastInvoiceName}</p>
              <p class="card-text"> {"Contact:"+" "+LastMobileNum}</p>
              
              <button class="btn btn-secondary btn-lg" disabled> {"Amount:"+" "+LastInvoiceAmount}</button>
              
            </div>
          </div>

          <br></br>

          <div
            class="card border-dark mb-3"
            style={{ maxWidth: "18rem", marginLeft: "30px" }}
          >
            <div class="card-header">Payments</div>
            <div class="card-body text-dark">
              <h5 class="card-title">Total Revenue</h5>
              <p class="card-text"> {"05 Crores"}</p>
              <div></div>
            </div>
          </div>
        </div>
        <Motion />
      </div>
    );
  }
}

export default Home;
