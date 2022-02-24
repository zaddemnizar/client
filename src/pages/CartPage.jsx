import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartElement from '../components/CartElement';
import { addProduct, removeProduct } from '../Redux/actions/actions';

class CartPage extends Component {
  render() {
    const { products, currency, onAdd, onRemove } = this.props;
    return (
      <div className='cartContainer'>
        <div className='cartHeader'>CART</div>
        {products.length === 0 && <p className='emptyCart'>Cart is empty</p>}
        {products.length > 0 && products.map(product => {
          return (
            <CartElement
              key={(Math.random() + 1).toString(36).substring(7)}
              onAdd={onAdd}
              product={product}
              currency={currency}
              onRemove={onRemove}
            />
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    currency: state.currency
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAdd: (product, qtty = 0) => dispatch(addProduct(product, qtty)),
    onRemove: (product) => dispatch(removeProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);