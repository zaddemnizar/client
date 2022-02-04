import React, { Component } from "react";
import Logo from "./logo";
import cart from "../cart.svg"
import vector from "../vector.svg"



class Actions extends Component {

  render() {
    return (
      <div className="actions">
        <div className="currencyLabel" >
          <span>$</span>
          <img src={vector} className="vectorLogo" alt="vector" />
        </div>
        <img src={cart} className="cartLogo" alt="cart" />
      </div>
    );
  }
}

export default Actions;
