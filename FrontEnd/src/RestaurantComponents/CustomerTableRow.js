import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class MenuTableRow extends Component {


    render() {
        return (
            <tr>
                <td>{this.props.obj.item}</td>
                <td>{this.props.obj.itemCat}</td>
                <td>{this.props.obj.price}</td>
                <td><Button onClick={this.deleteItem} size="sm">Add to Cart</Button></td>
            </tr>
        );
    }
}