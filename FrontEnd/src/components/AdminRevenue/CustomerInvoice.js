import React, { Component } from "react";
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import { Container, Button, Alert} from 'react-bootstrap'
import Swal from "sweetalert2"



class CustomerInvoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoiceFetchedData: [],
      // invoiceID: "",
      // billingName: "",
      // billingAddress: "",
      // mobileNumber: "",
      // roomNumber: "",
      // numberOfAdults: "",
      // numberOfChildern: "",
      // totalDates: "",
      // totalAmount: "",
      visibleAlert: true
      
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);



    
  }

  myChangeHandler = (event) => {
    this.setState({ invoiceID: event.target.value });
   
  };

  toggle() {
    this.setState({
      visibleAlert: !this.state.visibleAlert
    });

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'You have successfully updated the invoice',
      showConfirmButton: false,
      timer: 2000
    })
  }


 
  handleChange(event) {
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
    
    this.setState({ [htmlid]: input });
    if (htmlid === "invoiceID") {
      
      if (!invoiceIDPattern.test(input)) {
        {
          errMsg = "Invoice ID must be a valid format INVXXXX";
        }
      }
    } else if (htmlid === "mobileNumber") {
      
      if (!mobileNumPattern.test(input)) {
        MobileNumErrMsg = "Mobile number must be a valid format 77XXXXXXX";
      }
    } else if (htmlid === "roomNumber") {
      
      if (!roomNumPattern.test(input)) {
        RoomErrMsg = "Room ID must be a valid format RMXXXX";
      }
    } else if (htmlid === "totalAmount") {
      
      if (!amountPattern.test(input)) {
        AmountErrMsg = "Amount must be a valid format";
      }

    }

    
    console.log("id param -> " + event.target.id);
    console.log("States -> " + JSON.stringify(this.state));
    // this.setState({formdata:{[html_id]: event.target.value}});

    this.setState({ errMsg: errMsg });
    this.setState({ MobileNumErrMsg: MobileNumErrMsg });
    this.setState({ RoomErrMsg: RoomErrMsg });
    this.setState({ AmountErrMsg: AmountErrMsg });
  }

  handleSubmit(event) {
    console.log("IN handleSubmit(event)");
    const FetchedRefID = this.props.match.params.id;
    //alert("States -> " + JSON.stringify(this.state));
    console.log(event.target);
    event.preventDefault();

    let tosend = this.state;
    //console.log("to send -> " + tosend);
    axios
      .post("http://localhost:8070/invoice/update/" + FetchedRefID, this.state)
      .then(function (response) {
        console.log(response.data)
    
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  componentDidMount() {
    const FetchedRefID = this.props.match.params.id;
    console.log("ref " + FetchedRefID);

    axios
      .get("http://localhost:8070/invoice/view/" + FetchedRefID)
      .then((response) => {
        console.table(response.data);
        this.setState({ invoiceRefID: response.data._id });
        this.setState({ invoiceFetchedData: response.data });
        this.setState({ invoiceID: response.data.invoiceID });
        this.setState({ billingName: response.data.billingName });
        this.setState({ billingAddress: response.data.billingAddress });
        this.setState({ mobileNumber: response.data.mobileNumber });
        this.setState({ roomNumber: response.data.roomNumber });
        this.setState({ noOfAdults: response.data.noOfAdults });
        this.setState({ noOfChildern: response.data.noOfChildern });
        this.setState({ totalDates: response.data.totalDates });
        this.setState({ totalAmount: response.data.totalAmount });
        console.log("");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMsg: "Cannot fetch invoice data" });
      });
  }

  DelInv(e) {
    //const FetchedRefID = this.props.match.params.id;
    //console.log("ref " + this.post._id)
    console.log("delete func in");
    const btnValue = e.target.value;
    console.log("ref id: " + btnValue);

    Swal.fire({
      title: 'Are you sure you want to delete this invoice?',
      text: "This action cannot be undone",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d9534f',
      cancelButtonColor: '#292b2c',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        axios
        .delete("http://localhost:8070/invoice/delete/" + btnValue)
        .then(() => {    
          this.props.history.push({
          pathname: "/admin/revenue/ViewInvoice",
          state: this.state,
          });
  
  
        });
    
        Swal.fire(
          'Successfully Deleted!',
          'Invoice has been deleted.',
          'success'
        )
      }
    })

 
    
  }

  render() {
    const { invoiceFetchedData } = this.state;

    console.log(this.props.match.params.id);
    const invoiceRefID = this.props.match.params.id;


    return (
      
      <div className="container">
        <br></br>
        
        <h1 class="display-2">
          
          {"INVOICE" + " " + "#" + this.state.invoiceID}
        </h1>
        <p class="h6" style={{ color: "grey" }}>
          {"Customer Name: " + this.state.billingName}{" "}
        </p>
        <Link to="/admin/revenue/ViewInvoice" type="button" class="btn btn-secondary btn-sm">{"< Back to All Invoices"}</Link>
        <br></br><br/>
        <div id="hideDiv" class="alert alert-success" hidden={this.state.visibleAlert}  role="alert">
  You have successfully updated the invoice
</div>

        {/* adding the from */}

        <form class="row g-3 needs-validation" onSubmit={this.handleSubmit}>
          <div class="col-md-9">
            <br></br>
            <div class="input-group has-validation">
              <span
                class="input-group-text"
                id="inputGroupPrepend"
                style={{ background: "#cdd1d4" }}
              >
                PAYMENT_REF
              </span>
              <input
                type="text"
                class="form-control"
                id="paymentRefNo"
                aria-describedby="inputGroupPrepend"
                defaultValue={invoiceRefID}
                style={{ background: "#ebedef" }}
                // onChange={(event) => {
                //   setRoomNum(event.target.value);
                // }}
                disabled
                required
              />
            </div>
          </div>
          <p style={{ marginBottom: "1px", fontSize: "13px", color: "red" }}>
            Payment Reference ID cannot be changed
          </p>

          <div class="col-md-4">
            <label for="invoiceID" class="form-label">
              {"Invoice ID "}{" "}
              <label
                class="form-label"
                style={{ color: "red", marginLeft: "10px" }}
              >
                {this.state.errMsg}
              </label>
            </label>
            <input
              type="text"
              class="form-control"
              id="invoiceID"
              onChange={this.handleChange}
              value={this.state.invoiceID}
              maxLength="7"
              onkeyup="EnableDisable(this)"
              //   onChange={(event) => {
              //     setID(event.target.value);
              //   }}

              required
            />
          </div>

          <br></br>

          <div class="col-md-8">
            <label for="billingName" class="form-label">
              Customer Name
            </label>
            <input
              type="text"
              class="form-control"
              id="billingName"
              value={this.state.billingName}
              onChange={this.handleChange}
              maxLength="40"
              //   onChange={(event) => {
              //     setName(event.target.value);
              //   }}

              required
            />
          </div>

          <br></br>
          <div class="col-md-8">
            <label for="billingAddress" class="form-label">
              Billing Address
            </label>
            <input
              type="text"
              class="form-control"
              id="billingAddress"
              value={this.state.billingAddress}
              onChange={this.handleChange}
              maxLength="70"
              //   onChange={(event) => {
              //     setAddress(event.target.value);
              //   }}

              required
            />
          </div>

          <br></br>

          <div class="col-md-4">
            <label for="invoiceID" class="form-label">
              {"Mobile Number "}{" "}
              <label
                class="form-label"
                style={{ color: "red", marginLeft: "10px" }}
              >
                {this.state.MobileNumErrMsg}
              </label>
            </label>
            <div class="input-group has-validation">
              <span class="input-group-text" id="inputGroupPrepend">
                +94
              </span>
              <input
                type="text"
                class="form-control"
                id="mobileNumber"
                value={this.state.mobileNumber}
                maxLength="9"
                onChange={this.handleChange}
                // onChange={(event) => {
                //   setMobile(event.target.value);
                // }}

                required
              />
            </div>
          </div>

          <br></br>

          <div class="col-md-4">
            <label for="roomNumber" class="form-label">
              {"Room ID "}
              <label
                class="form-label"
                style={{ color: "red", marginLeft: "10px" }}
              >
                {this.state.RoomErrMsg}
              </label>
            </label>
            <div class="input-group has-validation">
              <span class="input-group-text" id="inputGroupPrepend">
                RM_ID
              </span>
              <input
                type="text"
                class="form-control"
                id="roomNumber"
                aria-describedby="inputGroupPrepend"
                value={this.state.roomNumber}
                onChange={this.handleChange}
                maxLength="6"
                // onChange={(event) => {
                //   setRoomNum(event.target.value);
                // }}

                required
              />
            </div>
          </div>
          <br></br>

          <div class="col-md-4">
            <label for="noOfAdults" class="form-label">
              No of Adults
            </label>
            <input
              type="text"
              class="form-control"
              id="noOfAdults"
              value={this.state.noOfAdults}
              onChange={this.handleChange}
              //   onChange={(event) => {
              //     setAdults(event.target.value);
              //   }}

              required
            />
          </div>

          <div class="col-md-4">
            <label for="noOfChildern" class="form-label">
              No of Children
            </label>
            <input
              type="text"
              class="form-control"
              id="noOfChildern"
              value={this.state.noOfChildern}
              onChange={this.handleChange}
              //   onChange={(event) => {
              //     setChildern(event.target.value);
              //   }}

              required
            />
          </div>

          <div class="col-md-4">
            <label for="totalDates" class="form-label">
              Total Dates
            </label>
            <input
              type="text"
              class="form-control"
              id="totalDates"
              value={this.state.totalDates}
              onChange={this.handleChange}
              //   onChange={(event) => {
              //     setDates(event.target.value);
              //   }}

              required
            />
          </div>

          <div class="col-md-8">
            <label for="totalAmount" class="form-label">
            {"Total Amount "}{" "}
            <label
                class="form-label"
                style={{ color: "red", marginLeft: "10px" }}
              >
                {this.state.AmountErrMsg}
              </label>
            </label>
            <div class="input-group has-validation">
              <span class="input-group-text" id="inputGroupPrepend">
                LKR
              </span>
              <input
                type="text"
                class="form-control"
                id="totalAmount"
                value={this.state.totalAmount}
                onChange={this.handleChange}
                // onChange={(event) => {
                //   setAmount(event.target.value);
                // }}

                required
              />
            </div>
          </div>

          <br></br>
          <br></br>

      

          <div>
            <button type="submit" id="updateBtn" class="btn btn-outline-primary" onClick={this.toggle.bind(this)} 
            disabled={(
              this.state.AmountErrMsg!=="✅" 
              
              )}

            
            >
              
              Update Invoice 
            </button>
            
            

            <button
              class="btn btn-outline-success"
              onClick={window.print}
              style={{ marginLeft: "20px" }}
            >
              Print Invoice
            </button>
            <button
              class="btn btn-outline-danger"
              style={{ marginLeft: "20px" }}
              value={this.state.invoiceRefID}
              onClick={(e) => this.DelInv(e, "value")}

            >
              Delete Invoice
            </button>
          </div>
        </form>
<br/><br/>
        {/* end of the form */}
      </div>
    );
  }
}

export default CustomerInvoice
