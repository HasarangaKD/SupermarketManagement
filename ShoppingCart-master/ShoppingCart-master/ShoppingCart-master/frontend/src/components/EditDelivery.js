import React, { Component } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "./Navbar";

export default class EditDelivery extends Component {
  constructor(props) {
    super(props);

    this.onChangeCustomerName = this.onChangeCustomerName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDeliveryMethod = this.onChangeDeliveryMethod.bind(this);
    this.onChangeItemCode = this.onChangeItemCode.bind(this);
    this.onChangeNICNumber = this.onChangeNICNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      customerName: "",
      NICNumber: "",
      itemCode: "",
      address: "",
      deliveryMethod: "",
      contactNumber: "",
      date: new Date(),
      deliveryOptions: [],
      input: {},
      errors: {},
      newErrors: {},
      errorMessage: "",
      successMessage: "",
      isValid: true,
    };
  }

  componentDidMount(e) {
    // axios
    //   .get("http://localhost:8070/delivery/" + this.props.match.params.id)
    //   .then((response) => {
    //     this.setState({
    //       customerName: response.data.customerName,
    //       NICNumber: response.data.NICNumber,
    //       itemCode: response.data.itemCode,
    //       address: response.data.address,
    //       deliveryMethod: response.data.deliveryMethod,
    //       contactNumber: response.data.contactNumber,
    //       date: new Date(response.data.date),
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    this.setState({
      deliveryOptions: ["Cash On delivery", "Post"],
      deliveryMethod: "test delivery",
    });
  }

  onChangeCustomerName(e) {
    this.setState({
      customerName: e.target.value,
    });
  }
  onChangeNICNumber(e) {
    this.setState({
      NICNumber: e.target.value,
    });
  }
  onChangeItemCode(e) {
    this.setState({
      itemCode: e.target.value,
    });
  }
  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }
  onChangeDeliveryMethod(e) {
    this.setState({
      deliveryMethod: e.target.value,
    });
  }
  onChangeContactNumber(e) {
    this.setState({
      contactNumber: e.target.value,
    });
  }
  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const delivery = {
      customerName: this.state.customerName,
      NICNumber: this.state.NICNumber,
      itemCode: this.state.itemCode,
      address: this.state.address,
      deliveryMethod: this.state.deliveryMethod,
      contactNumber: this.state.contactNumber,
      date: this.state.date,
    };

    console.log(delivery);

    if (this.state.isValid) {
      axios
        .post("http://localhost:8070/delivery/update"+this.props.match.id, delivery)
        .then((res) => {
          console.log(res.data);
          this.setState({ successMessage: "Success" });
        })
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            this.setState({ errorMessage: error.message });
          } else if (error.request) {
            // The request was made but no response was received
            this.setState({ errorMessage: error.message });
          } else {
            // Something happened in setting up the request that triggered an Error
            this.setState({ errorMessage: error.message });
          }
        });
    } else {
      this.setState({ errorMessage: "Error" });
    }

    this.setState({
      customerName: "",
    });
    this.setState({
      NICNumber: "",
    });
    this.setState({
      itemCode: "",
    });
    this.setState({
      address: "",
    });
    this.setState({
      deliveryMethod: "",
    });
    this.setState({
      contactNumber: "",
    });
    this.setState({
      date: "",
    });
  }

  viewDelivery = () => {
    window.href = "http://localhost:3000/delivery/generate";
  };

  render() {
    return (
      <div>
        {/* <HomeScreen /> */}
        <Navbar />

        <div className="container mt-4">
          {this.state.errorMessage && (
            <div class="alert alert-danger alert-dismissible" role="alert">
              <button type="button" class="close" data-dismiss="alert">
                &times;
              </button>
              Delivery Update Unsuccess
            </div>
          )}
          {this.state.successMessage && (
            <div class="alert alert-success alert-dismissible" role="alert">
              <button type="button" class="close" data-dismiss="alert">
                &times;
              </button>
              Delivery Update Success
            </div>
          )}

          <h3 className="pb-3 text-center">Update Delivery</h3>
          <form onSubmit={this.onSubmit} className="was-validated">
            <div className="form-group">
              <label>Customer Name: </label>
              <input
                type="text"
                name="customerName"
                required
                className="form-control"
                value={this.state.customerName}
                onChange={this.onChangeCustomerName}
              />
              {/* <div class="valid-feedback">Valid.</div> */}
              <div className="invalid-feedback">
                Please fill out this field.
              </div>
            </div>

            <div className="form-group">
              <label>NIC Number: </label>
              <input
                type="text"
                name="NICNumber"
                required
                className="form-control"
                value={this.state.NICNumber}
                onChange={this.onChangeNICNumber}
              />
              <div className="text-danger">{this.state.errors.name}</div>
            </div>

            <div className="form-group">
              <label>Item Code: </label>
              <input
                type="text"
                name="itemCode"
                required
                className="form-control"
                value={this.state.itemCode}
                onChange={this.onChangeItemCode}
              />
              <div className="text-danger">{this.state.errors.name}</div>
            </div>

            <div className="form-group">
              <label>Address: </label>
              <input
                type="text"
                name="address"
                required
                className="form-control"
                value={this.state.address}
                onChange={this.onChangeAddress}
              />
              <div className="text-danger">{this.state.errors.name}</div>
            </div>

            <div className="form-group">
              <label>Delivery Method: </label>
              <select
                ref="userInput"
                name="deliveryMethod"
                required
                className="form-control"
                value={this.state.deliveryMethod}
                onChange={this.onChangeDeliveryMethod}
              >
                {this.state.deliveryOptions.map(function (delivery) {
                  return (
                    <option key={delivery} value={delivery}>
                      {delivery}
                    </option>
                  );
                })}
              </select>
              <div className="text-danger">{this.state.errors.name}</div>
            </div>

            <div className="form-group">
              <label>Contact Number: </label>
              <input
                type="text"
                id="contact_number"
                name="contactNumber"
                required
                className="form-control"
                value={this.state.contactNumber}
                onChange={this.onChangeContactNumber}
              />
              {this.state.newErrors["contactNumber"] && (
                <div className="text-danger">
                  Contact number length must be 10
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  className="form-control"
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
              {/* <div className="text-danger">{this.state.errors.name}</div> */}
            </div>

            <div class="row">
              <div class="col">
                <div className="form-group">
                  <input
                    type="submit"
                    value="Update Delivery"
                    className="btn btn-primary"
                  />

                  {/* <div className="text-danger">{this.state.errors.name}</div> */}
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    );
  }
}
