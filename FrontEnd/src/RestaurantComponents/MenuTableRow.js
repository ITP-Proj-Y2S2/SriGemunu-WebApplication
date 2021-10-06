import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class MenuTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem() {
        axios.delete('http://localhost:8070/restaurant/delete/' + this.props.obj._id)
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
                <td>{this.props.obj.item}</td>
                <td>{this.props.obj.itemno}</td>
                <td>{this.props.obj.itemCat}</td>
                <td>{this.props.obj.price}</td>
                <td>
                    <Link to={"/restaurant/editfood/" + this.props.obj._id}><Button size="sm" variant="warning" >Edit</Button>{''}</Link>
                </td>   
                <td>
                    <Button onClick={this.deleteItem} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}