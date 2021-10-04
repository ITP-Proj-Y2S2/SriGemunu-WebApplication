import React, { Component,PropTypes } from "react";
import axios from "axios";
import CounterClass from "./CounterClass";
import Motion from "./Motion";

import RevenueCSS from "./Revenue.module.css"
import {Link} from 'react-router-dom';
import {Bar,Pie,Doughnut} from 'react-chartjs-2';
import PinInput from "react-pin-input";
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';

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
      successIcon:true,
      
      value: ""
      
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


  btnState = {
    loading: false
  }

  fetchBtnData = () => {

    this.setState({loading:true});

    setTimeout(()=>{
      this.setState({loading:false});

    },2000)
  }


  onChange = value => {
    this.setState({ value });
  };

  onClear = () => {
    this.setState({
      value: ""
    });
    this.pin.clear();
  };

  fetchSucessIconData = () => {

    this.setState({successIcon:true});

    setTimeout(()=>{
      this.setState({successIcon:false});

    },2000)
  }
  

  printDocument() {
    const input = document.getElementById('collapseExample');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.setFontSize(9)
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.text(60,270,'Verified by Head of Revenue Manager')
        pdf.text(60,280,'© Sri Gemunu Beach Resort 2021')
        // pdf.output('dataurlnewwindow');
        pdf.save("RevenueData.pdf");
      })
    ;
  }

  // printDocument() { 

  //   var doc = new jsPDF('landscape','px','a4','false')
  //   doc.text
  // }

 

  render() {



     const { fetchLast, fetchTotal, posts, loading ,value,successIcon} = this.state;

    let TotalAmount = 0.0;
    let Amount = 0.0
    let AmountArray=[];
    let invoiceIDChart=""
    let invoiceIDChartArray=[];

    let invoiceName=""
    let invoiceNameArray=[];

    let totalDates=0;
    let totalDatesArray=[];

    let noOfAdults=0;
    let TotalAdults=0;
    

    let noOfChild=0;
    let TotalChild=0;
    

    let childAdultArray=[];
    



    for (let index = 0; index < fetchTotal; index++) {
      console.log("num"+index)
      console.log("Amount " + posts[index].totalAmount); 


      Amount = parseFloat(posts[index].totalAmount);
      TotalAmount += parseFloat(posts[index].totalAmount);
      AmountArray[index]= Amount;

      invoiceIDChart = (posts[index].invoiceID);
      invoiceIDChartArray[index] = invoiceIDChart

      invoiceName = (posts[index].billingName);
      invoiceNameArray[index] = invoiceName

      totalDates = parseFloat(posts[index].totalDates);
      totalDatesArray[index]= totalDates

      noOfAdults=parseInt(posts[index].noOfAdults);
      TotalAdults += parseInt(posts[index].noOfAdults);
      

      noOfChild=parseInt(posts[index].noOfChildern);
      TotalChild += parseInt(posts[index].noOfChildern);
      

      childAdultArray = [TotalAdults,TotalChild]


      
    }




    
    console.log(AmountArray);
    console.log(invoiceIDChartArray);
    console.log(invoiceIDChartArray[2]);

    console.log(invoiceNameArray);
    console.log(totalDatesArray);
    
    console.log(childAdultArray);

  

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

    const stateChartTWO = {

    
    
      labels: invoiceNameArray,
      datasets: [
        {
          label: 'Total Spent Dates',
          backgroundColor: '#ffc006',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 0,
          data: totalDatesArray
        }
      ]
    }

    const statePieChart = {
      labels: ['Adult', 'Kids'],
      datasets: [
        {
          label: 'Adult Kids',
          backgroundColor: [
            '#007aff',
            '#34c759',
            
          ],
          hoverBackgroundColor: [
          '#00438c',
          '#1d6d31',
          
          ],
          data: childAdultArray
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

    new Date().toLocaleString()

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

        {/* <Link to="/admin/revenue/TempChart" type="button" class="btn btn-warning btn-lg" style={{marginLeft:"30px"}}>Generate Report</Link> */}

        <Link type="button" class="btn btn-warning btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{marginLeft:"30px"}}> Generate Report </Link>
        
        </div>

 
        

        <br/><br/><br/>

        <div>

  <div class="row" style={{marginTop:"100px"}}>
    <div class="col-sm-5 col-md-6">


    <div><span style={{ color: "#27a844" }} class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
            </span>
            <p className="h6" style={{marginTop:"-23.4px", marginLeft:"25px", color: "#707070"}}>Invoice ID & Amount in LKR</p>
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
            <p className="h6" style={{marginTop:"-23.4px", marginLeft:"25px", color: "#707070"}}>Total Spent Days</p>
            </div>

    <div  style={{width:"80%", marginLeft:"-20px", marginTop:"40px"}}>


{/* CHART TWO */}
<Bar
          data={stateChartTWO}
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

{/* <div><span style={{ color: "#27a844",marginLeft:"-325px",marginTop:"-10px" }} class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
            </span>
            <p className="h6" style={{marginTop:"30px", marginLeft:"-280px", color: "#707070"}}>Total Spent Days</p>
            </div> */}

<div  style={{width:"50%", marginLeft:"-230px", marginTop:"40px"}}>
<div className="container" style={{marginBottom:"50px", marginRight:"-30px"}}>
<span style={{ color: "#27a844" }} class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
            </span>
<p className="h6" style={{marginLeft:"30px", marginTop:"-20px", color: "#707070"}}>Total Adults & Kids</p>
</div>

{/* CHART THREE */}
<Doughnut
          data={statePieChart}
          options={{
            title:{
              display:true,
              text:'Pie Chart',
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




<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Generate Report</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h1 style={{textAlign:"center"}}>Generate Report</h1><br/>




             <div class="col-md"  >
  <div class="card bg-c-revenuePage order-card" style={{borderRadius:"20px"}}>
      <div class="card-block">
          <h6 class="m-b-20" style={{color:"white"}}>Payments</h6>   
          <h2 class="text-right" style={{color:"white"}}><span>{"Total Revenue"}</span></h2>
          <p class="card-text" style={{fontSize:"55px", marginBottom:"-19px"}}> {TotalAmount}<a style={{fontSize:"30px", color:"#8f8f8f"}}>{" LKR"}

          

          </a></p>
          
          
          <br/> <br/> 
    
      </div>
      <a ><img src="https://res.cloudinary.com/srigemunuwebapp/image/upload/v1633343686/monophy_jmgnns.gif"
          style={{width:"25%", marginTop:"-255px", marginLeft:"480px"}} class="img-fluid" alt="Responsive image"/></a>
  </div>
</div>

<h4 style={{textAlign:"center"}}>Sri Gemunu Beach Resort</h4>
<p style={{textAlign:"center", marginTop:"-10px", color:"grey"}}>Auto Generated Invoice Report</p>

<p style={{textAlign:"center"}}>
  <button class="btn btn-warning" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"
  onClick={this.fetchBtnData}
  disabled={loading}

  >
  {loading && <i className="spinner-border spinner-border-sm" style={{ marginRight: "7px" }}></i>}
    Generate Revenue Report
  </button>

  {/* <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample" style={{marginLeft:"20px"}}>
  Generate
  </button> */}

</p>

{/* ////////////////////////////////////////////////// */}
<div class="collapse" id="collapseExample">
  <div class="card card-body">
    <h1 >Sri Gemunu Beach Resort</h1>
    <p style={{marginTop:"-10px", color:"grey"}}>Official income statement ✔</p>


    {/* //////////////////////////TABLE////////////////////// */}

    <table class="table table-borderless table-dark">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Invoice ID</th>
      <th scope="col">Customer Name</th>
      <th scope="col">Room ID</th>
      <th scope="col">Amount LKR</th>
    </tr>
  </thead>
  </table>

    {
                posts.length ?
                posts.map((posts,index)=> <div key={index}><h1 class="h6"key={index}>

    <table class="table table-borderless table-dark " style={{marginTop:"-16px"}}>

  <tbody>
    <tr>
      <th scope="row">{index}</th>
      <td>{posts.invoiceID}</td>
      <td>{posts.billingName}</td>
      <td>{posts.roomNumber}</td>
      <td className={RevenueCSS.td}>{posts.totalAmount}</td>
    </tr>

  </tbody>
</table>


   


                </h1></div>):null
                
            }
           

            <table class="table table-borderless table-dark">

  <tbody>

    <tr>
      <th scope="row"></th>
      <td style={{fontSize:"25px"}} colspan="2">Total Amount LKR</td>
      <td style={{fontSize:"25px"}}>{TotalAmount+"LKR"}</td>
      
    </tr>

    <tr>
      <th scope="row"></th>
      <td style={{fontSize:"25px"}} colspan="2">Total Invoices</td>
      <td style={{fontSize:"25px"}}>{"0"+posts.length}</td> 
       
    </tr>

    <tr>
      <th scope="row"></th>
      <td style={{fontSize:"25px"}} colspan="2">Date Issued</td>
      <td style={{fontSize:"25px"}}>{new Date().toLocaleString() + ""}</td> 
       
    </tr>
  </tbody>
</table>






<div className="container" style={{textAlign:"center"}}>
<p style={{marginTop:"10px", color:"grey"}}>Enter Security PIN to Issue PDF</p>
        <PinInput style={{color:"grey"}}
          length={4}
          focus
         
          secret
          ref={p => (this.pin = p)}
          type="numeric"
          onChange={this.onChange}
        />
        </div>
        

        <div style={{width:"10%", marginLeft:"330px", marginTop:"20px"}} 
        >
  <a><img src="https://res.cloudinary.com/srigemunuwebapp/image/upload/v1633356610/ezgif.com-gif-maker_kcqce0.gif"
          class="img-fluid" alt="Responsive image" 
         
            hidden={(
              value!=="9920" 
              
              )}/></a> </div>



    {/* //////////////////////////END OF TABLE////////////////////// */}

    

  </div>



  <div style={{textAlign:"center"}}>
<button type="button" class="btn btn-warning"
            disabled={(
              value!=="9920" 
              
              )}
              onClick={this.printDocument}
>Issue PDF</button></div>
</div>




{/* ////////////////////////////////////////////////// */}
<div class="collapse" id="collapseExample2">
  <div class="card card-body">
   
   

{/* paste code here */}








  </div>

</div>


  {/* <div>
      <div className="mb5">
        <button onClick={this.printDocument}>Print</button>
      </div>
      <div id="divToPrint" className="mt4" style={{
        
        backgroundColor: 'grey',
        width: '200mm',
        minHeight: '297mm',
        marginLeft: 'auto',
        marginRight: 'auto'}}

      
      >
        <div>Note: Here the dimensions of div are same as A4</div> 
        <div>You Can add any component here</div>
      </div>
    </div> */}

        
      </div>
      <div class="modal-footer">
        <Link type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</Link>
        
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
