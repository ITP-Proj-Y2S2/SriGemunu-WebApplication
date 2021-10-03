import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "../styles/EditFood.css";

export default class EditFood extends Component {

  constructor(props) {
    super(props)

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

  componentDidMount() {
    axios.get('http://localhost:8070/restaurant/edit/' + this.props.match.params.id)
      .then(res => {
        this.setState({
            item: res.data.item,
            itemCat: res.data.itemCat,
            itemno: res.data.itemno,
            price: res.data.price
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeFoodItem(e) {
    this.setState({ item: e.target.value })
  }

  onChangeFoodItemCat(e){
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

    axios.put('http://localhost:8070/restaurant/update/' + this.props.match.params.id, foodObject)
      .then((res) => {
        console.log(res.data)
       
      }).catch((error) => {
        console.log(error)
      })
      alert('Food Item successfully updated')
    this.props.history.push('/restaurant/retrfood')
    window.location.reload(false);
  }

  render() {
    return (
      <div className="edits">
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

        <Form.Group controlId="itemNo">
          <Form.Label>Item No</Form.Label>
          <Form.Control type="text" value={this.state.itemno} onChange={this.onChangeFoodItemNo} />
        </Form.Group>

        <Form.Group controlId="Price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" value={this.state.price} onChange={this.onChangeFoodPrice} />
        </Form.Group>
        <div className="updateButton">
        <div className="d-grid gap-2"><Button variant="primary" size="lg" block="block" type="submit">
          Update Food Item
        </Button></div>
        </div>
      </Form>
    </div>
    </div>);
  }
}