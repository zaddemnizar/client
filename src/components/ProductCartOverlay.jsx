import React, { Component } from "react";
import productCard from "../productCart.png";



class ProductCartOverlay extends Component {

  render() {
    return (
      <div className="productCart">
        <div>
          <div className="productTileCart">
            Apollo Running Short
          </div>
          <div className="productPriceCart">
            $50.00
          </div>
        </div>
        <div>
          <button className="rectangle" >
            +
          </button>
          <div className="count">
            {this.props.counter}
          </div>
          <button className="rectangle" >
            -
          </button>
        </div>
        <div>
          <img src={productCard} className="productCartImg" alt="Product" />
        </div>
      </div>
    );
  }
}


export default ProductCartOverlay;