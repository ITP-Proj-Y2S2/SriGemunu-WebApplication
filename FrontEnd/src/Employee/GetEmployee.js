import React, { Component } from "react";
import axios from 'axios';
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
    return (<div>
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
    </table>
  </div>);
  }
}