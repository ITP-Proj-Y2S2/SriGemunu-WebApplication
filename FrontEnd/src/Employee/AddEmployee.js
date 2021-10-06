import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "../styles/AddEmployee.css";

export default class AddEmployee extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangefirstName = this.onChangefirstName.bind(this);
    this.onChangelastName = this.onChangelastName.bind(this);
    this.onChangecontactNumber = this.onChangecontactNumber.bind(this);
    this.onChangeaddress = this.onChangeaddress.bind(this);
    this.onChangeNIC = this.onChangeNIC.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangeemployeeType = this.onChangeemployeeType.bind(this);
    this.onChangesalary = this.onChangesalary.bind(this);
    this.onChangeavailability = this.onChangeavailability.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        firstName:'',      
        lastName:'',
        contactNumber:'',
        address:'',
        NIC:'',
        email:'',
        emailError: "",
        employeeType:'',
        salary:'',
        availability:''
      }
  }

  onChangefirstName(e) {
    this.setState({ firstName: e.target.value })
  }

  onChangelastName(e) {
    this.setState({ lastName: e.target.value })
  }

  onChangecontactNumber(e) {
    this.setState({ contactNumber: e.target.value })
  }

  onChangeaddress(e) {
    this.setState({ address: e.target.value })
  }

  onChangeNIC(e) {
    this.setState({ NIC: e.target.value })
  }

  onChangeemail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeemployeeType(e) {
    this.setState({ employeeType: e.target.value })
  }

  onChangesalary(e) {
    this.setState({ salary: e.target.value })
  }

  onChangeavailability(e) {
    this.setState({ availability: e.target.value })
  }

  validate = () => {
    let isError = false;
    const errors = {
      emailError: "",
    };


    if (this.state.email.indexOf("@") === -1) {
      isError = true;
      errors.emailError = "Requires valid email";
      alert("Answer of your question XD");
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  onSubmit(e) {
    e.preventDefault()
    const err = this.validate();
    if (!err) {

    const employeeObject = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        contactNumber: this.state.contactNumber,
        address: this.state.address,
        NIC: this.state.NIC,
        email: this.state.email,
        employeeType: this.state.employeeType,
        salary: this.state.salary,
        availability: this.state.availability
      };
      console.log(employeeObject)
  

    axios.post('http://localhost:8070/employee/add', employeeObject)
      .then(res => {
          console.log(res.data)
          alert('Employee successfully added')
          this.props.history.push('/admin/employee/getEmp')
          window.location.reload(false);
        }).catch(e=>{
          alert('Error',e);
        });
        
   
    this.setState({
        firstName:'',
        lastName:'',
        contactNumber:'',
        address:'',
        NIC:'',
        email:'',
        employeeType:'',
        salary:'',
        availability:''
    });
  }

  }
  
  render() {
    return (
    
    <div className="form-wrapper mt-5">
    <div className="container mt-5 pt-5" >
      <Form onSubmit={this.onSubmit} className = "formemp">

      <Form.Group controlId="firstName">
          <Form.Label>firstName</Form.Label>
          <Form.Control type="text" value={this.state.firstName} onChange={this.onChangefirstName} />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>lastName</Form.Label>
          <Form.Control type="text" value={this.state.lastName} onChange={this.onChangelastName} />
        </Form.Group>

        <Form.Group controlId="contactNumber">
          <Form.Label>contactNumber</Form.Label>
          <Form.Control type="text" value={this.state.contactNumber} onChange={this.onChangecontactNumber} />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>address</Form.Label>
          <Form.Control type="text" value={this.state.address} onChange={this.onChangeaddress} />
        </Form.Group>

        <Form.Group controlId="NIC">
          <Form.Label>NIC</Form.Label>
          <Form.Control type="text" value={this.state.NIC} onChange={this.onChangeNIC} />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>email</Form.Label>
          <Form.Control type="text" value={this.state.email} onChange={this.onChangeemail} errorText={this.state.emailError} />
        </Form.Group>

        <Form.Group controlId="employeeType">
          <Form.Label>employeeType</Form.Label>
          <Form.Control type="text" value={this.state.employeeType} onChange={this.onChangeemployeeType} />
        </Form.Group>

        <Form.Group controlId="salary">
          <Form.Label>salary</Form.Label>
          <Form.Control type="text" value={this.state.salary} onChange={this.onChangesalary} />
        </Form.Group>

        <Form.Group controlId="availability">
          <Form.Label>availability</Form.Label>
          <Form.Control type="text" value={this.state.availability} onChange={this.onChangeavailability} />
        </Form.Group>
<br/><br/>
        <div className="addButtonemp" >
        <Button type="submit" variant="dark" size="lg">
          Add Employee
        </Button>
        </div>
        <br/><br/>
      </Form>
      </div>
    </div>
  
    );
  }
}