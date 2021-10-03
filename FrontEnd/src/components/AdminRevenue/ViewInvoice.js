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
            console.log(response.data)
            
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


        return(

            
            <div className="container">
            <br/><br/>
            <h1 class="display-2">Manage Invoices</h1>
            
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

                


   


<div class="card w-50" style={{background:"#292929", borderRadius:"20px"}}>
  <div class="card-body" >
    <h5 class="card-title" style={{color:"white"}}>Ref ID: {post._id}</h5>
    <p class="card-text" style={{color:"#999999"}}>Billing Name:{post.billingName}</p>
    <p class="card-text" style={{color:"#999999"}}>Billing ID:{post.invoiceID}</p>
    


    
    
    <Link to={"/admin/revenue/ViewInvoice/CustomerInvoice/"+post._id} className="btn btn-outline-warning" style={{borderRadius:"10px"}} value={post._id}>{"View Invoice"}</Link>
    <br></br>

    
    
    
  </div>
</div>



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