import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "../styles/AddFood.css";

export default class AddFood extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeFoodItem = this.onChangeFoodItem.bind(this);
    this.onChangeFoodItemCat = this.onChangeFoodItemCat.bind(this);
    this.onChangeFoodItemNo = this.onChangeFoodItemNo.bind(this);
    this.onChangeFoodPrice = this.onChangeFoodPrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        item: '',
        itemCat: '',
        itemno: '',
        price: ''
      }
  }

  onChangeFoodItem(e) {
    this.setState({ item: e.target.value })
  }

  onChangeFoodItemCat(e) {
    this.setState({ itemCat: e.target.value })
  }

  onChangeFoodItemNo(e) {
    this.setState({ itemno: e.target.value })
  }

  onChangeFoodPrice(e) {
    this.setState({ price: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const foodObject = {
        item: this.state.item,
        itemCat: this.state.itemCat,
        itemno: this.state.itemno,
        price: this.state.price
      };
  

    axios.post('http://localhost:8070/restaurant/add', foodObject)
      .then(res => {
          console.log(res.data)
          alert('Food Item successfully added')
        });
        
    this.props.history.push('/restaurant/admin/retrfood')
    window.location.reload(false);
    this.setState({
        item: '',
        itemCat:'',
        itemno: '',
        price: ''
    });

  }

  render() {
    return (
    
      <div className="container mt-5 pt-5">
    <div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Item">
          <Form.Label>Item</Form.Label>
          <Form.Control type="text" value={this.state.item} onChange={this.onChangeFoodItem} />
        </Form.Group>

        <Form.Group controlId="ItemCat">
          <Form.Label>Item Catergory</Form.Label>
          <Form.Control type="text" value={this.state.itemCat} onChange={this.onChangeFoodItemCat} />
        </Form.Group>
        
        <Form.Group controlId="ItemNo">
          <Form.Label>Item No</Form.Label>
          <Form.Control type="text" value={this.state.itemno} onChange={this.onChangeFoodItemNo} />
        </Form.Group>

        <Form.Group controlId="Price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" value={this.state.price} onChange={this.onChangeFoodPrice} />
        </Form.Group>
        <div className="addButton">
        <Button block="block" type="submit">ADD FOOD ITEM</Button>
        </div>
      </Form>
    </div>
    </div>
    );
    
  }
}