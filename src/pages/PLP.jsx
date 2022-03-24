// PLP - product listing page, a.k.a. category page
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductsCategory } from '../api/store';
import PageProductsList from '../components/PageProductsList';
import { addProduct } from '../Redux/actions/actions';


class PLP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  async fetch() {
    const { category } = this.props;
    await fetchProductsCategory(category).then(data => {

      this.setState(prev => ({
        ...prev,
        products: data.data.category.products
      }));
    })
  }

  async componentDidMount() {
    this.fetch();
  }

  async componentDidUpdate(prevProps) {
    this.props.category !== prevProps.category && this.fetch();
  }

  render() {
    const { products } = this.state;
    const { addProd, currency, category } = this.props;

    return (
      < PageProductsList
        title={category}
        products={products}
        addProd={addProd}
        currency={currency}
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

export default connect(mapStateToProps, mapDispatchToProps)(PLP);