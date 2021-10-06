import React,{ PureComponent } from "react";
import MenuTableRow from './MenuTableRow';
import "../styles/Report.css";
import jsPDF from 'jspdf';
import Button from 'react-bootstrap/Button';

export default class ReportGen extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }

  jspdfgenerator = (items) => {

    var doc = new jsPDF('p','pt');

    const tableColumn = [ "Item" ,"Item Category","Item No","Price"];
    const tableRows = [];
    this.state.items.map((items) => {
        const itemDetails = [
          this.props.obj.item,
          this.props.obj.itemno,
          this.props.obj.itemCat,
          this.props.obj.price,
        ];
        tableRows.push(itemDetails);
      });
    doc.autoTable(tableColumn, tableRows, {styles: { fontSize: 12, halign: "center" },startY: 35, });
    doc.save("generated.pdf");
  }

  render() {
    return (
    <div className="reportpage">
       <Button size="sm" variant="danger" onClick={this.jspdfgenerator}>Generate Report</Button>
       </div>
       )
  }


}