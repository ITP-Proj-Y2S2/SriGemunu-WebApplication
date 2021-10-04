import React, {useState,Component} from "react";
import axios from "axios";
import {Link, useHistory} from 'react-router-dom';




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
    handleChange = handleChange.bind(this);

    function myChangeHandler (event)  {
      this.setState({ invoiceID: event.target.value });
     
    };

    function handleChange(event) {
      //this.setState({ email: event.target.value });
      let input = event.target.value;
      let inputLength = event.target.value.length;
  
      //RegExp patterns
      const invoiceIDPattern = /^INV[0-9]{4}$/;
      const mobileNumPattern = /^7[^+94][0-9]{7}$/;
      const roomNumPattern = /^RM[0-9]{4}$/;
      const amountPattern = /^[0-9]*$/;
  
      let htmlid = event.target.id;
      let errMsg = "✅";
      let MobileNumErrMsg = "✅";
      let RoomErrMsg = "✅";
      let AmountErrMsg="✅";
      console.log("hello" + htmlid);
      this.setState({ [htmlid]: input });
      if (htmlid === "invoiceID") {
        console.log("im id");
        if (!invoiceIDPattern.test(input)) {
          {
            errMsg = "Invoice ID must be a valid format INVXXXX";
          }
        }
      } else if (htmlid === "mobileNumber") {
        console.log("im mobile");
        if (!mobileNumPattern.test(input)) {
          MobileNumErrMsg = "Mobile number must be a valid format 77XXXXXXX";
        }
      } else if (htmlid === "roomNumber") {
        console.log("im in room");
        if (!roomNumPattern.test(input)) {
          RoomErrMsg = "Room ID must be a valid format RMXXXX";
        }
      } else if (htmlid === "totalAmount") {
        console.log("im in room");
        if (!amountPattern.test(input)) {
          AmountErrMsg = "Amount must be a valid format";
        }
  
      }
  
      console.log("IN handleChange");
      console.log("id param -> " + event.target.id);
  
      console.log("States -> " + JSON.stringify(this.state));
      // this.setState({formdata:{[html_id]: event.target.value}});
  
      this.setState({ errMsg: errMsg });
      this.setState({ MobileNumErrMsg: MobileNumErrMsg });
      this.setState({ RoomErrMsg: RoomErrMsg });
      this.setState({ AmountErrMsg: AmountErrMsg });
    }






    ////////////////////////////END OF VALIDATION///////////////////

    console.log(NewInvoice);

    axios.post("/invoice/add",NewInvoice).then(()=>{
      alert("Invoice Added Successfully")
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
      
       <div className="container">
       <br/><br/>
       <h1 class="display-2">Issue Customer Invoice</h1>
       <br></br>

       {/* {this.state.alert_message=="success"?<SuccessAlert/>:null}
       {this.state.alert_message=="error"?<ErrorAlert/>:null} */}



     <form onSubmit={sendData} class="row g-3 needs-validation" target="_blank">

  <div class="col-md-4">
    <label for="invoiceID" class="form-label">Invoice ID</label>
    <input type="text" class="form-control" id="invoiceID" placeholder="INVXXXXID"
    
    onChange={(event)=>{

      setID(event.target.value);

    }} required/>

  </div>

  <br></br>

  <div class="col-md-8">
    <label for="billingName" class="form-label">Customer Name</label>
    <input type="text"  class="form-control" id="billingName" placeholder="A.P.Perera"
    onChange={(event)=>{

      setName(event.target.value);

}}required/>
   
    </div>

    <br></br>
  <div class="col-md-8">
    <label for="billingAddress" class="form-label">Billing Address</label>
    <input type="text" class="form-control" id="billingAddress" placeholder="No.1234,Main St,Colombo"
    
    onChange={(event)=>{

      setAddress(event.target.value);

}}required/>
  </div>

  <br></br>

  <div class="col-md-4">
    <label for="mobileNumber" class="form-label">Mobile Number</label>
    <div class="input-group has-validation">
      <span class="input-group-text" id="inputGroupPrepend">+94</span>
      <input type="text" class="form-control" id="validationCustomUsername"  placeholder="77XXXXXXX"
      
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
      <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" placeholder="RM0023"
      
      onChange={(event)=>{

        setRoomNum(event.target.value);

}}required/>
      
    </div>
  </div>
  <br></br>

  <div class="col-md-4">
    <label for="noOfAdults" class="form-label">No of Adults</label>
    <input type="text" class="form-control" id="noOfAdults" placeholder="00"
    
    onChange={(event)=>{

      setAdults(event.target.value);

    }} required/>

  </div>


  <div class="col-md-4">
    <label for="noOfChildern" class="form-label">No of Children</label>
    <input type="text" class="form-control" id="noOfChildern" placeholder="00"
    
    onChange={(event)=>{

      setChildern(event.target.value);

    }} required/>

  </div>

  <div class="col-md-4">
    <label for="totalDates" class="form-label">Total Dates</label>
    <input type="text" class="form-control" id="totalDates" placeholder="00"
    
    onChange={(event)=>{

      setDates(event.target.value);

    }} required/>

  </div>


  <div class="col-md-8">
    <label for="totalAmount" class="form-label">Total Amount</label>
    <div class="input-group has-validation">
      <span class="input-group-text" id="inputGroupPrepend">LKR</span>
      <input type="text" class="form-control" id="totalAmount" placeholder="74000LKR"
      
      onChange={(event)=>{

    setAmount(event.target.value);

}}required/>
      
    </div>
  </div>


  <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="agreed" required/>
  <label class="form-check-label" for="flexSwitchCheckDefault">Customer confirm that customer have read, consent and agree to Sri Gamunu's User Agreement and Privacy Policy</label>
</div>





  
  <br></br>
  <br></br>
  
  <button type="submit" class="btn btn-primary">Issue Invoice</button>
  <button type="reset" class="btn btn-outline-danger">Reset Invoice</button>


</form>
<br/><br/><br/>
</div>
          
   );
} 

