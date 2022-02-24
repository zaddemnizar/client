import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct, removeProduct } from '../Redux/actions/actions';
import CartElement from "./CartElement";

class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: 0
    }
  }

  checkout(products, currency) {
    let totalPrice = 0;
    let checkout_obj = [];
    if (products.length > 0) {
      products.map(element => {
        element.prices.map(price => {
          if (currency === price.currency.symbol) {
            totalPrice += price.amount * element.qtty;
          }
          return price
        })
        const { name, brand, qtty, sizes } = element;
        checkout_obj = [
          ...checkout_obj,
          {
            name, brand, qtty, sizes
          }
        ]
        return element;
      })
      totalPrice = totalPrice.toFixed(2);
      checkout_obj.push({ totalPrice, currency: this.props.currency })
    };
    return {
      checkout_obj,
      totalPrice
    }
  };

  productsCount(products) {
    let count = 0;
    products.map(product => count += product.qtty);
    return count;
  }


  render() {
    const { onClose, show, products, currency, onAdd, onRemove } = this.props;
    const { checkout_obj, totalPrice } = this.checkout(products, currency);
    const totalCount = this.productsCount(products);

    return (
      <div className="overlay" onClick={onClose} style={{ display: show ? "block" : "none" }}>
        <div className="display" style={{ opacity: show ? 1 : 0 }}>
          <div className="modalContent" onClick={e => e.stopPropagation()}>
            <div className="cartOverlayTitle">
              <span className="bold">My Bag, </span>
              {totalCount} item{totalCount > 1 && 's'}
            </div>
            <div className="modal-body">
              {products && products.map(product => {
                return (
                  <CartElement
                    small
                    onAdd={onAdd}
                    key={(Math.random() + 1).toString(36).substring(7)}
                    product={product}
                    currency={currency}
                    onRemove={onRemove}
                  />
                )
              })}
            </div>

            <div className="total">
              <div className="totalLabel">Total:</div>
              <div className="totalAmount">{currency} {totalPrice}</div>
            </div>
            <div className="btnWrapper">
              <Link to='/cart'>
                <button onClick={onClose} className="viewBagBtn">
                  VIEW BAG
                </button>
              </Link>
              <button className="checkOutBtn">
                CHECK OUT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    products: state.products,
    currency: state.currency
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAdd: (product) => dispatch(addProduct(product)),
    onRemove: (product) => dispatch(removeProduct(product))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);