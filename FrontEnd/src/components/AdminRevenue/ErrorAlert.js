import React, { Component } from "react";

export default class SuccessAlert extends Component {

    render() {
        return (
          <div class="alert alert-danger" role="alert">
            Invoice failed to add
          </div>
        );
    }
}