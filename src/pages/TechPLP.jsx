// PLP - product listing page, a.k.a. category page
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../api/store';
import PageProductsList from '../components/PageProductsList';
import { addProduct } from '../Redux/actions/actions';


class TechPLP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  async componentDidMount() {
    const data = (await fetchData()).tech;
    this.setState(prev => ({
      ...prev,
      products: data
    }))
  }

  render() {
    const { products } = this.state;
    const { addProd, currency } = this.props;

    return (
      < PageProductsList
        title='Tech'
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

export default connect(mapStateToProps, mapDispatchToProps)(TechPLP);