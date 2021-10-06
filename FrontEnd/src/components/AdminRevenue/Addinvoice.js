import React, {useState,Component} from "react";
import axios from "axios";
import {Link, useHistory} from 'react-router-dom';
import Swal from "sweetalert2"




export default function Addinvoice() {

  const history = useHistory();
  
  const [invoiceID, setID] = useState("");
  const [billingName, setName] = useState("");
  const [billingAddress, setAddress] = useState("");
  const [mobileNumber, setMobile] = useState("");
  const [roomNumber, setRoomNum] = useState("");
  const [noOfAdults, setAdults] = useState("");
  const [noOfChildern, setChildern] = useState("");
  const [totalDates, setDates] = useState("");
  const [totalAmount, setAmount] = useState("");

  
 

  function handleHistory () {

    history.push("/admin/revenue/ViewInvoice");
  }

  function sendData(event)
  {
    event.preventDefault();
    

    const NewInvoice = {

      invoiceID,
      billingName,
      billingAddress,
      mobileNumber,
      roomNumber,
      noOfAdults,
      noOfChildern,
      totalDates,
      totalAmount,

    }


    ////////////////////////////VALIDATION///////////////////
    

    console.log(NewInvoice);

    axios.post("/invoice/add",NewInvoice).then(()=>{
     
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Invoice has been issued',
        showConfirmButton: false,
        timer: 1500
      })

      history.push("/admin/revenue/ViewInvoice");

      
        setID("");
        setName("");
        setAddress("");
        setMobile("");
        setRoomNum("");
        setAdults("");
        setChildern("");
        setDates("");
        setAmount("");

       //this.setState({alert_message:"success"})
    }).catch((err)=>{
      alert(err)
       //this.setState({alert_message:"error"})
    })



  }


   return (
      
       <div className="container" >
       <br/><br/>
       <h1 class="display-2">Issue Customer Invoice</h1>
       <br></br>





     <form onSubmit={sendData} class="row g-3 needs-validation" target="_blank">

  <div class="col-md-4">
    <label for="invoiceID" class="form-label">{"Invoice ID "}{" "}


    </label>
    <input type="text" class="form-control" id="invoiceID" placeholder="INVXXXXID"
    maxLength="7"
    pattern="^INV[0-9]{4}$"
    onChange={(event)=>{
      
      setID(event.target.value);
     
    }} required/>

  </div>

  <br></br>

  <div class="col-md-8">
    <label for="billingName" class="form-label">Customer Name</label>
    <input type="text"  class="form-control" id="billingName" placeholder="A.P.Perera"
    maxLength="40"
    
    onChange={(event)=>{

      setName(event.target.value);

}} required/>
   
    </div>

    <br></br>
  <div class="col-md-8">
    <label for="billingAddress" class="form-label">Billing Address</label>
    <input type="text" class="form-control" id="billingAddress" placeholder="No.1234,Main St,Colombo"
    maxLength="70"
    // pattern="[a-zA-Z0-9\s]+"
    onChange={(event)=>{
      
      setAddress(event.target.value);

}} required/>
  </div>

  <br></br>

  <div class="col-md-4">
    <label for="mobileNumber" class="form-label">Mobile Number</label>
    <div class="input-group has-validation">
      <span class="input-group-text" id="inputGroupPrepend">+94</span>
      <input type="text" class="form-control" id="validationCustomUsername"  placeholder="77XXXXXXX"
       maxLength="9"
       pattern="^7[^+94][0-9]{7}$"
      onChange={(event)=>{

        setMobile(event.target.value);

}} required/>
      
    </div>
  </div>

  <br></br>


  <div class="col-md-4">
    <label for="roomNumber" class="form-label">Room ID</label>
    <div class="input-group has-validation">
      <span class="input-group-text" id="inputGroupPrepend">RM_ID</span>
      <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" placeholder="RM0023"
      maxLength="6"
      pattern="^RM[0-9]{4}$"
      onChange={(event)=>{

        setRoomNum(event.target.value);

}} required/>
      
    </div>
  </div>
  <br></br>

  <div class="col-md-4">
    <label for="noOfAdults" class="form-label">No of Adults</label>
    <input type="text" class="form-control" id="noOfAdults" placeholder="00"
    maxLength="2"
    pattern="\d{2}"
    onChange={(event)=>{

      setAdults(event.target.value);

    }} required/>

  </div>


  <div class="col-md-4">
    <label for="noOfChildern" class="form-label">No of Children</label>
    <input type="text" class="form-control" id="noOfChildern" placeholder="00"
    maxLength="2"
    pattern="\d{2}"
    onChange={(event)=>{

      setChildern(event.target.value);

    }} required/>

  </div>

  <div class="col-md-4">
    <label for="totalDates" class="form-label">Total Dates</label>
    <input type="text" class="form-control" id="totalDates" placeholder="00"
    maxLength="2"
    pattern="[0-9]{2}"
    onChange={(event)=>{

      setDates(event.target.value);

    }} required/>

  </div>


  <div class="col-md-8">
    <label for="totalAmount" class="form-label">Total Amount</label>
    <div class="input-group has-validation">
      <span class="input-group-text" id="inputGroupPrepend">LKR</span>
      <input type="text" class="form-control" id="totalAmount" placeholder="74000"
      maxLength="10"
      pattern="[0-9]+"
      onChange={(event)=>{

    setAmount(event.target.value);

}} required/>
      
    </div>
  </div>


  <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="agreed" required/>
  <label class="form-check-label" for="flexSwitchCheckDefault">Customer confirm that customer have read, consent and agree to Sri Gamunu's User Agreement and Privacy Policy</label>
</div>





  
  <br></br>
  <br></br>
  
  <button type="submit" class="btn btn-primary" 
  
  >Issue Invoice</button>
  <button type="reset" class="btn btn-outline-danger">Reset Invoice</button>


</form>
<br/><br/><br/>
</div>
          
   );
} 

