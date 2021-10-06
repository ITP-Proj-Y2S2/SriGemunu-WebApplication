import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class EmployeeTable extends Component {

    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem() {
        axios.delete('http://localhost:8070/employee/delete/' + this.props.obj._id)
            .then((res) => {
                alert('Item successfully deleted!')
                window.location.reload(false);
            }).catch((error) => {
                console.log(error)
            })
    }
    

    render() {
        return (
           
            <tr>
                <td>{this.props.obj.firstName}</td>
                <td>{this.props.obj.lastName}</td>
                <td>{this.props.obj.contactNumber}</td>
                <td>{this.props.obj.address}</td>
                <td>{this.props.obj.NIC}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.employeeType}</td>
                <td>{this.props.obj.salary}</td>
                <td>{this.props.obj.availability}</td>
                <td>
                    <Link to={"/admin/employee/editEmp/" + this.props.obj._id}>
                    <Button size="sm" variant="primary" >Edit</Button>{' '}
                    </Link>
                    <Button onClick={this.deleteItem} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
            
        );
    }
}