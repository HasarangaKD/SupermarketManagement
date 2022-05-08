import React, { Component } from "react";
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
import axios from "axios";

const Delivery = (props) => (
  <tr>
    <td>{props.delivery.customerName}</td>
    {/* <td>{props.delivery.NICNumber}</td> */}
    <td>{props.delivery.itemCode}</td>
    <td>{props.delivery.address}</td>
    <td>{props.delivery.deliveryMethod}</td>
    <td>{props.delivery.contactNumber}</td>
    {/* <td>{props.delivery.date.substring(0, 10)}</td> */}
    <td>
      <Link to={"/delivery/edit/" + props.delivery._id}>edit</Link> |{" "}
      <a href="#" onClick={() => {props.deleteDelivery(props.delivery._id);}}>
        delete
      </a>
    </td>
  </tr>
);

export default class DeliveryDetails extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //     customerName: "",
    //     NICNumber: "",
    //     itemCode: "",
    //     address: "",
    //     deliveryMethod: "",
    //     contactNumber: "",
    //     date: new Date(),
    //   };

    this.deleteDelivery = this.deleteDelivery.bind(this);

    this.state = { deliveries: [] };
  }

  componentDidMount(e) {
    axios
      .get("http://localhost:8070/delivery/")
      .then((response) => {
        this.setState({ deliveries: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteDelivery(id) {
    axios.delete("http://localhost:8070/delivery/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
        deliveries: this.state.deliveries.filter((el) => el._id !== id),
    });
  }

  deliveryList() {
    return this.state.deliveries.map((currentDelivery) => {
      return (
        <Delivery
            delivery={currentDelivery}
          deleteDelivery={this.deleteDelivery}
          key={currentDelivery._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="container mt-4">
          <div>
            <h3 className="pb-3">Current Delivery Details</h3>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th>Customer Name</th>
                  {/* <th>NIC</th> */}
                  <th>Item Code</th>
                  <th>Address</th>
                  <th>Delivery Method</th>
                  <th>Contact Number</th>
                  {/* <th>Date</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.deliveryList()}</tbody>
            </table>
          </div>

          {/* <table class="table">
            <thead class="thead-dark">
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
              </tr>
              <tr>
                <td>Mary</td>
                <td>Moe</td>
                <td>mary@example.com</td>
              </tr>
              <tr>
                <td>July</td>
                <td>Dooley</td>
                <td>july@example.com</td>
              </tr>
            </tbody>
          </table> */}
        </div>
      </div>
    );
  }
}
