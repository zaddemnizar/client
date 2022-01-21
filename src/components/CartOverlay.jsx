import React, { Component } from "react";
import ProductCartOverlay from "./ProductCartOverlay";


// const showHideClassName = this.props.showstate ? "cartModal display" : "cartModal hide" ;

class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="display">
        <div className="cartModal" >
          <div className="cartOverlayTitle"><span className="bold">My Bag,</span> 2 items</div>
          <ProductCartOverlay />
          <ProductCartOverlay />
          <div className="total">
            <div className="totalLabel">Total</div>
            <div className="totalAmount">$100.00</div>
          </div>
          <button className="viewBagBtn"><label className="buttonLabel">VIEW BAG</label></button>
          <button className="checkOutBtn white"><label className="buttonLabel">CHECK OUT</label></button>
        </div>
      </div>
    );
  }
}

export default CartOverlay;


// this.props.showstate ? "cartModal hide" : "cartModal display"