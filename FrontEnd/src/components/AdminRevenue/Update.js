import React, {Component, useState, useEffect,} from "react";
import axios from "axios";



import {Link} from 'react-router-dom';


export default function Update(props) {

    //console.log(this.props.match.params.id)
    //console.log(props.match.params.id)
    const FetchedRefID = props.match.params.id
    const [UserData, setUserData] = useState({});
    const [invoiceID, setID] = useState("");
    const [billingName, setName] = useState("");
    const [billingAddress, setAddress] = useState("");
    const [mobileNumber, setMobile] = useState("");
    const [roomNumber, setRoomNum] = useState("");
    const [noOfAdults, setAdults] = useState("");
    const [noOfChildern, setChildern] = useState("");
    const [totalDates, setDates] = useState("");
    const [totalAmount, setAmount] = useState("");

 
    
    

    useEffect(() => {
      
      axios
        .get("http://localhost:8070/invoice/view/" + FetchedRefID)
        .then((response) => {
          console.table(response.data);
          console.log(response.data.billingName);
          //setState({ invoiceData: response.data })
          setUserData(response.data);

          //this.setState({ FetchedData: response.data })
        })
        .catch((error) => {
          console.log(error);
          //this.setState({ errorMsg: "Cannot fetch invoice data" });
        });
      console.log("In use effect");


    }, );

 
   
 

    function sendData(event) {

        event.preventDefault();
        

        const UpdatedInvoice = {

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

          console.log("NewInvoice");





          // axios.post("http://localhost:8070/invoice/updates/"+FetchedRefID,UpdatedInvoice).then(()=>{
          //   alert("Invoice added through frontend")
            
          //     setID("");
          //     setName("");
          //     setAddress("");
          //     setMobile("");
          //     setRoomNum("");
          //     setAdults("");
          //     setChildern("");
          //     setDates("");
          //     setAmount("");
      
          //    //this.setState({alert_message:"success"})
          // }).catch((err)=>{
          //   alert(err)
          //    //this.setState({alert_message:"error"})
          // })


    }







    return(

        
        
        
        <div className="container">
       

      
<div className="container">
        <h1 class="display-2">Update Invoice</h1> 
       
      
       <br></br>



     <form onSubmit={sendData} class="row g-3 needs-validation" target="_blank">


     <div class="col-md-9">
                <br></br>
                <div class="input-group has-validation">
                  <span class="input-group-text" id="inputGroupPrepend" style={{background:"#cdd1d4"}}>
                    PAYMENT_REF
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    id="paymentRefNo"
                    aria-describedby="inputGroupPrepend"
                    defaultValue={UserData._id}
                    style={{background:"#ebedef"}}
                    // onChange={(event) => {
                    //   setRoomNum(event.target.value);
                    // }}
                    disabled
                    required
                  />
                </div>
              </div>
              <p style={{marginBottom:"1px", fontSize:"13px", color:"red"}}>Payment Reference ID cannot be changed</p>


  <div class="col-md-4">
    <label for="invoiceID" class="form-label">Invoice ID</label>
    <input type="text" class="form-control" id="invoiceID" value={UserData.invoiceID}
    
    onChange={(event)=>{
      
      setID(event.target.value);

    }} required/>

  </div>

  <br></br>

  <div class="col-md-8">
    <label for="billingName" class="form-label">Customer Name</label>
    <input type="text" class="form-control" id="billingName" value={UserData.billingName}
    
    onChange={(event)=>{

      setName(event.target.value);

}}required/>
   
    </div>

    <br></br>
  <div class="col-md-8">
    <label for="billingAddress" class="form-label">Billing Address</label>
    <input type="text" class="form-control" id="billingAddress" value={UserData.billingAddress}
    
    onChange={(event)=>{

      setAddress(event.target.value);

}}required/>
  </div>

  <br></br>

  <div class="col-md-4">
    <label for="mobileNumber" class="form-label">Mobile Number</label>
    <div class="input-group has-validation">
      <span class="input-group-text" id="inputGroupPrepend">+94</span>
      <input type="text" class="form-control" id="validationCustomUsername"  value={UserData.mobileNumber}
      
      onChange={(event)=>{

        setMobile(event.target.value);

}}required/>
      
    </div>
  </div>

  <br></br>


  <div class="col-md-4">
    <label for="roomNumber" class="form-label">Room ID</label>
    <div class="input-group has-validation">
      <span class="input-group-text" id="inputGroupPrepend">RM_ID</span>
      <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" value={UserData.roomNumber}
      
      onChange={(event)=>{

        setRoomNum(event.target.value);

}}required/>
      
    </div>
  </div>
  <br></br>

  <div class="col-md-4">
    <label for="noOfAdults" class="form-label">No of Adults</label>
    <input type="text" class="form-control" id="noOfAdults" value={UserData.noOfAdults}
    
    onChange={(event)=>{

      setAdults(event.target.value);

    }} required/>

  </div>


  <div class="col-md-4">
    <label for="noOfChildern" class="form-label">No of Children</label>
    <input type="text" class="form-control" id="noOfChildern" value={UserData.noOfChildern}
    
    onChange={(event)=>{

      setChildern(event.target.value);

    }} required/>

  </div>

  <div class="col-md-4">
    <label for="totalDates" class="form-label">Total Dates</label>
    <input type="text" class="form-control" id="totalDates" value={UserData.totalDates}
    
    onChange={(event)=>{

      setDates(event.target.value);

    }} required/>

  </div>


  <div class="col-md-8">
    <label for="totalAmount" class="form-label">Total Amount</label>
    <div class="input-group has-validation">
      <span class="input-group-text" id="inputGroupPrepend">LKR</span>
      <input type="text" class="form-control" id="totalAmount" value={UserData.totalAmount }
      
      onChange={(event)=>{

    setAmount(event.target.value);

}}required/>
      
    </div>
  </div>



  
  <br></br>
  <br></br>
  
  <button type="submit" class="btn btn-primary">Update Invoice</button>
  <button type="reset" class="btn btn-outline-danger">Reset Invoice</button>
  

</form>

</div>

        </div>
        
    )
} 