import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import MenuTableRow from './MenuTableRow';
import "../styles/RetrFood.css";
import '../RestaurantComponents/ReportGen'
import jsPDF from 'jspdf';
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

  jspdfgenerator = (items) => {

    var doc = new jsPDF('p','pt');

    const tableColumn = [ "Item" ,"Item No","Item Category","Price"];
    const tableRows = [];
    this.state.items.map((items) => {
        const itemDetails = [
          items.item,
          items.itemno,
          items.itemCat,
          items.price,
        ];
        tableRows.push(itemDetails);
      });
    doc.text("Restaurant Food Entries", 14, 22).setFontSize(12);
    doc.autoTable(tableColumn, tableRows, {styles: { fontSize: 12, halign: "center" },startY: 35, });
    doc.save("generated.pdf");
  }

  render() {
    return (
    <div className="container">
      <div className="retrdisplay">
    <table className="table table-borderless table-dark">
      <thead>
        <tr>
          <th>Item</th>
          <th>Item No</th>
          <th>Catergory</th>
          <th>Price</th>
          <th>Edit Item</th>
          <th>Delete Item</th>
        </tr>
      </thead>
      <tbody>
        {this.DataTable()}
      </tbody>    
    </table>
    <div className="repocontainer">
    <Button size="sm" variant="danger" size="m" onClick={this.jspdfgenerator}>Generate Report</Button>
      </div>
      <div className="repocontainer">
      <Link to={"/restaurant/addfood"}><Button size="m" variant="danger" >Add New</Button>{' '}</Link>
      </div>
  </div>
  </div>);
  }
}
