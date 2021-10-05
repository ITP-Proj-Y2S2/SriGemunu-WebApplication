import React, { Component } from "react";
import axios from 'axios';
import CustomerTableRow from './CustomerTableRow';
import "../styles/CustomerRetr.css";
import Button from 'react-bootstrap/Button';
export default class CustomerRetr extends Component {

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
    axios.get('http://localhost:8070/restaurant/display').then(res => {
        this.setState({
          items: res.data
        });
    
      console.log(this.state.items)
    });
  }

  DataTable() {
    return this.state.items.map((items, i) => {
      return <CustomerTableRow obj={items} key={i} />;
    });
  }


  render() {
    return (
    <div className="container">
      <div className="cusdisplay">
    <table class="table">
      <thead>
        <tr>
          <th>Food Item</th>
          <th>Catergory</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {this.DataTable()}
      </tbody>
    </table>
  </div>
  </div>);
  }
}