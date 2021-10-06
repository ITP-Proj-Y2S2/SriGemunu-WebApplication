import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import EmployeeTable from './EmployeeTable';
import "../styles/GetEmployee.css";
export default class GetEmployee extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
      this.retrieveItems();
  }

  retrieveItems() {
    axios.get('http://localhost:8070/employee/get').then(res => {
        this.setState({
          items: res.data
        });
    
      console.log(this.state.items)
    });
  }

  DataTable() {
    return this.state.items.map((items, i) => {
      return <EmployeeTable obj={items} key={i} />;
    });
  }


  render() {
    return (<div className="container mt-5 pt-5">
    <table class="table">
      <thead>
        <tr>
        <th> firstName </th>
        <th> lastName </th>
        <th> contactNumber </th>
        <th> address </th>
        <th> NIC </th>
        <th> email </th>
        <th> employeeType </th>
        <th> salary </th>
        <th> availability </th>
        </tr>
      </thead>
      <tbody>
        {this.DataTable()}
      </tbody>
    </table><div className="contemp">
    <Link to={"/admin/employee/addEmp"}><Button size="lg" variant="dark" >Add New</Button>{' '}</Link>
  </div></div>);
  }
}