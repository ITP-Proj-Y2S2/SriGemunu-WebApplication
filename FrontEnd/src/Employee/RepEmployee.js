import React,{ PureComponent } from "react";
import "../styles/Report.css";
import jsPDF from 'jspdf';
import Button from 'react-bootstrap/Button';

export default class EmpReport extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }
//jspdf generator function
  jspdfgenerator = (items) => {
//new document object in jspdf
    var doc = new jsPDF('p','pt');

    const tableColumn = [ "firstName" ,"lastName","contactNumber","address","NIC","email","employeeType","salary"];
    const tableRows = [];
    this.state.items.map((items) => {
        const itemDetails = [
          this.props.obj.firstName,
          this.props.obj.lastName,
          this.props.obj.contactNumber,
          this.props.obj.address,
          this.props.obj.NIC,
          this.props.obj.email,
          this.props.obj.employeeType,
          this.props.obj.salary
        ];
        tableRows.push(itemDetails);
      });
      //set font of pdf
    doc.autoTable(tableColumn, tableRows, {styles: { fontSize: 12, halign: "center" },startY: 35, });
    doc.save("Employee.pdf");
  }
//render function of the components
  render() {
    return (
    <div className="reportpage">
       <Button size="lg" variant="dark" onClick={this.jspdfgenerator}>Generate Employee Report</Button>
       </div>
       )
  }


}