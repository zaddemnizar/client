import React, { Component } from "react";
import product from "../product.png";

class Card extends Component {

  render() {
    return (
      <li className="card" >
        <img src={product} className="productImage" alt="product" />
        <div className="productContent">
          <div className="productTile">
            Apollo Running Short
          </div>
          <div className="productPrice">
            $50.00
          </div>
        </div>
      </li>
    );
  }
}

export default Card;