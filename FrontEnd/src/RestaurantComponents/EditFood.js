import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "../styles/EditFood.css";
import Swal from "sweetalert2"

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
      itemError: '',
      itemCat: '',
      itemCatError: '',
      itemno: '',
      itemNoError: '',
      price: '',
      itemPriceError: '',
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

  validate = () => {
    let isError = false;
    const errors = {
      itemError: "",
      itemCatError:"",
      itemNoError:"",
      itemPriceError:'' 
    };


    if (this.state.item.length <1) {
      isError = true;
      errors.itemError = "Item Name is a required field !";
    }

    if (this.state.itemCat.length <1) {
      isError = true;
      errors.itemCatError = "Item is a required field !";
    }

    if (this.state.itemno.length <1) {
      isError = true;
      errors.itemNoError = "Item No is a required field !";
    }

    if (this.state.itemno.length > 3) {
      isError = true;
      errors.itemNoError = "Item No is only 3 digits !";
    }

    if (this.state.price.length <1) {
      isError = true;
      errors.itemPriceError = "Price is a required field !";
    }
    

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  onSubmit(e) {
    e.preventDefault()
    const err = this.validate();
    if (!err) {

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
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Food Item successfully updated',
        showConfirmButton: false,
        timer: 1500
      })
      /*alert('Food Item successfully updated')*/
    this.props.history.push('/restaurant/admin/retrfood')
    setTimeout(function(){
      window.location.reload(1);
   }, 1000);
  }
}

  render() {
    return (
      <div className="container mt-5 pt-5 pb-5">
    <div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Item">
          <Form.Label>Item</Form.Label>
          <Form.Control type="text" value={this.state.item} onChange={this.onChangeFoodItem} />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.itemError}
          </div>
        </Form.Group>

        <Form.Group controlId="ItemCat">
          <Form.Label>Item Catergory</Form.Label>
          <Form.Control type="text" value={this.state.itemCat} onChange={this.onChangeFoodItemCat} />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.itemCatError}
          </div>
        </Form.Group>

        <Form.Group controlId="itemNo">
          <Form.Label>Item No</Form.Label>
          <Form.Control type="text" value={this.state.itemno} onChange={this.onChangeFoodItemNo} />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.itemNoError}
          </div>
        </Form.Group>

        <Form.Group controlId="Price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" value={this.state.price} onChange={this.onChangeFoodPrice} />
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.itemPriceError}
          </div>
        </Form.Group>
        <div className="updateButton"><Button variant="primary" size="lg" block="block" type="submit">Update Food Item</Button></div>
      </Form>
    </div>
    </div>);
  }
}