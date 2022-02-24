import React, { Component } from "react";
import cart from "../cart.svg"
import CurrencySelector from "./CurrencySelector";

class Actions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCurrency: '$'
    };
  }

  shouldComponentUpdate(props, nextState) {
    return nextState.selectedCurrency !== this.state.selectedCurrency
      || props.items !== this.props.items;
  }

  render() {
    const { items, changeCurrency } = this.props;
    return (
      <div className="actions">
        <div className="currencyLabel" >
          <CurrencySelector changeCurrency={changeCurrency} />
        </div>
        <div className="cartLogo" onClick={this.props.show}>
          <span className="cartQtty">{items}</span>
          <img
            src={cart}
            alt="cart"
          />
        </div>
      </div>
    );
  }
}

export default Actions;

