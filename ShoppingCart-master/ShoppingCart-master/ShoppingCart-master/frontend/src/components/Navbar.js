import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">HDSC Online</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cart">Cart</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Shop</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/delivery">Delivery</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
