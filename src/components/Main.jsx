import React, { Component } from "react";
import CartOverlay from "./CartOverlay";
import Card from "./ProductCard";


class Main extends Component {

  render() {
    return (
      <div className="container" >
        <div>
          <h1>Category name</h1>
        </div>
        <CartOverlay />
        <ul className="productsContainer">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ul>
      </div>
    );
  }
}


export default Main;