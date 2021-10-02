import React, {Component} from "react";
import axios from "axios";
import CounterClass from "./CounterClass";
import {Link} from 'react-router-dom';




class ViewInvoice extends Component {

  

    constructor(props) {
        super(props)

        this.state = {
            posts:[],
            btnData:[]
        }
    }

    componentDidMount() {

        axios.get('http://localhost:8070/invoice/')
        .then(response=>{
            //console.table(response.data)
            this.setState({posts:response.data})
            
        })
        .catch(error=>{
            console.log(error)
            this.setState({errorMsg: 'something went wrong with invoices'})
        })
    }



    render() {

       
        const { posts, errorMsg, btnData } = this.state
        console.log(posts.length)
        const NumberOfAllInvoices = posts.length;
        sessionStorage.setItem("NumberOfAllInvoices",NumberOfAllInvoices);

        
        const AllData = posts;
        
        //const FetchInvID = AllData.map(AllData=><div>{AllData.invoiceID}</div>)
        

        
       
        //console.log(JSON.parse(sessionStorage.getItem('posts')));

        // const FetchRefID = AllData.map(AllData=><div>{AllData._id}</div>)
        // sessionStorage.setItem("FetchRefID",FetchRefID);

        // const FetchName = AllData.map(AllData=><div>{AllData.billingName}</div>)
        // sessionStorage.setItem("FetchName",FetchName);

        // const FetchMobile = AllData.map(AllData=><div>{AllData.mobileNumber}</div>)
        // sessionStorage.setItem("FetchMobile",FetchMobile);

        // sessionStorage.setItem('job',"software eng");
        // console.log(sessionStorage.getItem('job'));
        
        



        return(

            
            <div className="container">
            <br/><br/>
            <h1 class="display-2">View All Invoices</h1>
            
            <div><span style={{ color: "#27a844" }} class="spinner-border spinner-border-sm" role="status" aria-hidden="true">
            </span>
            <p className="h6" style={{marginTop:"-23.4px", marginLeft:"25px", color: "#707070"}}>Last Updated: Just Now</p>
            </div>


            <br></br>
            <br></br>
            {btnData}
        
            



            {
                posts.length ?
                posts.map((post,index)=> <div key={index}><h1 class="h6"key={index}>

                
                {/* Name: {post.billingName}
                <br></br>
                ID: {post.invoiceID} */}
               
                {/* table */}

                {/* <table class="table table-striped">

  <tbody> 
    <tr>
      <th scope="row">{index}</th>
      <td>{post.invoiceID}</td>
      <td>{post.billingName}</td>
      <td>{post.mobileNumber}</td>
    </tr>


  </tbody>
</table> */}


<div class="card w-50">
  <div class="card-body">
    <h5 class="card-title" >Ref ID: {post._id}</h5>
    <p class="card-text">Billing Name:{post.billingName}</p>
    <p class="card-text">Billing ID:{post.invoiceID}</p>
    
    
  {/* <script>
    
    {
      function passValuesResult(){
      var id=document.getElementById("btnID").value;
      localStorage.setItem("textValue",id);
      return false;
      }

    }
  </script> */}

    
    {/* <Link to="/ViewInvoice/CustomerInvoice" type="submit"  id="btnID" value={post._id} className="btn btn-primary" Click="passValuesResult()">{"View Invoice"}</Link> */}
    
    <Link to={"/admin/revenue/ViewInvoice/CustomerInvoice/"+post._id} className="btn btn-primary" value={post._id}>{"View Invoice"}</Link>
    <br></br>
   
    {/* <button className="btn btn-primary" onClick={this.deleteInvoice}>Delete Invoice</button> */}
    
    
    
  </div>
</div>




{/* {sessionStorage.setItem('fetchInvoiceID',post.invoiceID)}
{sessionStorage.setItem('fetchBillingName',post.billingName)} */}

                <br></br>
                </h1></div>):null
                
            }
            
            {<h1 class="badge bg-primary text-wrap">Total Invoices:</h1>}
            {" "}
            <kbd>{"0"+NumberOfAllInvoices}</kbd>
            
            
            



            <br></br>
            {errorMsg ? <div>{errorMsg}</div>:null}
        

            
            </div>
        )
    }
}

export default ViewInvoice;