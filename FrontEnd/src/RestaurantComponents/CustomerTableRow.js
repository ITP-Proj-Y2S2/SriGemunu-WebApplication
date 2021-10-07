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
                <td>LKR {this.props.obj.price}</td>
            </tr>
        );
    }
}