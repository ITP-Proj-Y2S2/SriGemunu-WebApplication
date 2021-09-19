import React, { Component } from "react";
import axios from 'axios';
import MenuTableRow from './MenuTableRow';
import "../styles/RetrFood.css";
export default class RetrFood extends Component {

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
    axios.get('http://localhost:5000/restaurant/display').then(res => {
        this.setState({
          items: res.data
        });
    
      console.log(this.state.items)
    });
  }

  DataTable() {
    return this.state.items.map((items, i) => {
      return <MenuTableRow obj={items} key={i} />;
    });
  }


  render() {
    return (<div>
    <table class="table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Item No</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {this.DataTable()}
      </tbody>
    </table>
  </div>);
  }
}