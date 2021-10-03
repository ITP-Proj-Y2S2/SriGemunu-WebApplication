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
    axios.get('http://localhost:8070/restaurant/display').then(res => {
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
    return (
    <div className="container">
      <div className="retrdisplay">
    <table class="table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Item No</th>
          <th>Catergory</th>
          <th>Price</th>
          <th></th>
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