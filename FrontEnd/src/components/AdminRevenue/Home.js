import React, { Component } from "react";
import axios from "axios";
import CounterClass from "./CounterClass";
import Motion from "./Motion";
import RevenueHome from "./RevenueHome.module.scss";
import {Link} from 'react-router-dom';
import {Bar} from 'react-chartjs-2';

class Home extends React.Component {

  
  constructor(props) {
    super(props);
    

    this.state = {

      fetchLast: [],
      fetchTotal: [],
      AmountLKR:[],
      posts:[],
      TotalAmount:[],

      array:[],
      loading:true,

      //chartJS  AmountArray invoiceIDChartArray
//       labels: ['aneew', 'February', 'March',
//       'April', 'May','june'],
// datasets: [
// {
//  label: 'Rainfall',
//  backgroundColor: '#e8b527',
//  borderColor: 'rgba(0,0,0,1)',
//  borderWidth: 2,
//  data: [65, 59, 80, 81, 56,89]
 
// }
// ]

      
      
    };


    
    
  }

  
  

  async getAllInvoiceData(){
    
    

          // fetch All data
          await axios.get('http://localhost:8070/invoice/')
          .then(response=>{
              //console.table(response.data)
              this.setState({loading:false, posts:response.data})
              console.log(response.data)
              console.log(response.data.length)
              
          })
          .catch(error=>{
              console.log(error)
              this.setState({errorMsg: 'something went wrong with invoices'})
          })



    

  }




   async componentDidMount() {
    
    
    await this.getAllInvoiceData()
   
    
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



     const { fetchLast, fetchTotal, posts } = this.state;

    let TotalAmount = 0.0;
    let Amount = 0.0
    let AmountArray=[];
    let invoiceIDChart=""
    let invoiceIDChartArray=[];

    for (let index = 0; index < fetchTotal; index++) {
      console.log("num"+index)
      console.log("Amount " + posts[index].totalAmount); 


      Amount = parseFloat(posts[index].totalAmount);
      TotalAmount += parseFloat(posts[index].totalAmount);
      AmountArray[index]= Amount;

      invoiceIDChart = (posts[index].invoiceID);
      invoiceIDChartArray[index] = invoiceIDChart
      
    }




    
    console.log(AmountArray);
    console.log(invoiceIDChartArray);
    console.log(invoiceIDChartArray[2]);

  

    const stateChart = {

    
    
      labels: invoiceIDChartArray,
      datasets: [
        {
          label: 'Amount LKR',
          backgroundColor: '#ffc006',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 0,
          data: AmountArray
        }
      ]
    }
    
    

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
          <span class="badge bg-secondary" >Revenue Management Dashboard</span>
          <a ><img src="https://res.cloudinary.com/srigemunuwebapp/image/upload/v1633254573/paymentsbilling_z9rno8.gif"
          style={{width:"13%", marginTop:"-15px", marginleft:"-20px"}} class="img-fluid" alt="Responsive image"/></a>
        </h1>
        {/* https://res.cloudinary.com/srigemunuwebapp/image/upload/v1633254363/image_processing20200819-29479-swr9uc_jdecpm.gif */}
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
 


          <div class="col-md-4 col-xl-3" style={{ maxWidth: "18rem", marginLeft: "100px" }}>
            <div class="card bg-c-revenuePage order-card">
                <div class="card-block">
                    <h6 class="m-b-20" style={{color:"white"}}>Recent Invoice</h6>   
                    <h2 class="text-right" style={{color:"white"}}><span>{"ID:" + LastID}</span></h2>
                    <p class="card-text"> {"Name:"+" "+LastInvoiceName}</p>
                    <p class="card-text"> {"Contact:"+" "+LastMobileNum}</p>
                    <button style={{fontSize:"18px", marginTop:"7px"}} class="btn btn-secondary btn-lg" disabled> {"Amount:"+" "+LastInvoiceAmount+" LKR"}</button>
              
                </div>
            </div>
        </div>


          <br></br>

          <div class="col-md-4 col-xl-3" style={{ maxWidth: "18rem", marginLeft: "100px" }}>
  <div class="card bg-c-revenuePage order-card">
      <div class="card-block">
          <h6 class="m-b-20" style={{color:"white"}}>Payments</h6>   
          <h2 class="text-right" style={{color:"white"}}><span>{"Total Revenue"}</span></h2>
          <p class="card-text" style={{fontSize:"35px", marginBottom:"-19px"}}> {TotalAmount}<a style={{fontSize:"20px", color:"#8f8f8f"}}>{" LKR"}</a></p>
          
          <br/> <br/> <br/> <br/>
    
      </div>
  </div>
</div>


        </div>


        {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
        <div>
        <Link to="/admin/revenue/add" type="button" class="btn btn-dark btn-lg" >Issue Invoice</Link>
        
        <Link to="/admin/revenue/ViewInvoice" type="button" class="btn btn-dark btn-lg" style={{marginLeft:"30px"}}>Manage Invoices</Link>

        <Link to="/admin/revenue/TempChart" type="button" class="btn btn-warning btn-lg" style={{marginLeft:"30px"}}>Generate Report</Link>
        </div>
        

        <br/><br/><br/>

        <div>

  <div class="row" style={{marginTop:"100px"}}>
    <div class="col-sm-5 col-md-6">


    <div><span style={{ color: "#27a844" }} class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
            </span>
            <p className="h6" style={{marginTop:"-23.4px", marginLeft:"25px", color: "#707070"}}>Invoice ID AND Amount in LKR</p>
            </div>

    <div  style={{width:"80%", marginLeft:"-20px", marginTop:"40px"}}>


{/* CHART ONE */}
<Bar
          data={stateChart}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
</div>

    </div>
    <div class="col-sm-5 offset-sm-2 col-md-6 offset-md-0">

    <div><span style={{ color: "#27a844" }} class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
            </span>
            <p className="h6" style={{marginTop:"-23.4px", marginLeft:"25px", color: "#707070"}}>Invoice ID AND Amount in LKR</p>
            </div>

    <div  style={{width:"80%", marginLeft:"-20px", marginTop:"40px"}}>


{/* CHART TWO */}
<Bar
          data={stateChart}
          options={{
            title:{
              display:true,
              text:'text',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
</div>


    </div>
  </div>

</div>

<br/><br/><br/>
        
      </div>
      
    );
  }
}

export default Home;
