import React, { Component } from "react";
import productCard from "../productCart.png";
import { connect } from 'react-redux';
import {
  decrement,
  increment,
} from '../features/counter/counterSlice';


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
          <button className="rectangle" onClick={() => this.props.increment()}>
            +
          </button>
          <div className="count">
            {this.props.counter}
          </div>
          <button className="rectangle" onClick={() => this.props.decrement()}>
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

const mapStateToProps = state => ({
  counter: state.counter.value
});
const mapDispatchToProps = () => ({
  increment,
  decrement,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCartOverlay);