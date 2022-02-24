// PDP - product description page, a.k.a. product page
import React, { Component } from 'react';
import ProductDetail from '../components/ProductDetail';
import { fetchData } from '../api/store';
import { connect } from 'react-redux';
import { addProduct } from '../Redux/actions/actions';
import { usingRouter } from '../usingRouter';

class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      sizes: []
    }
  }

  async componentDidMount() {
    const { id } = this.props.params;
    let prod = (await fetchData()).allProducts.filter(element => {
      return element.id === id
    });
    this.setState(prev => ({
      ...prev,
      product: prod[0]
    }))
  }

  render() {
    const { product } = this.state;
    const { currency, addProd } = this.props;
    return product && (
      <ProductDetail
        onAdd={addProd}
        product={product}
        currency={currency}
        images={product.gallery}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    currency: state.currency
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProd: (product) => dispatch(addProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(usingRouter(PDP));