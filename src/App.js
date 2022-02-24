import React, { Component } from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Header from './components/header';
import ClothesPLP from "./pages/ClothesPLP";
import PDP from "./pages/PDP";
import PLP from "./pages/PLP";
import TechPLP from "./pages/TechPLP";
import CartPage from "./pages/CartPage";
import { currencyChange } from "./Redux/actions/actions";
import CartOverlay from "./components/CartOverlay";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    this.close = this.close.bind(this);
    this.show = this.show.bind(this);
  }

  show() {
    this.setState({ show: true });
  }

  close() {
    this.setState({ show: false });
  }

  productsCount(products) {
    let count = 0;
    products.map(product => count += product.qtty);
    return count;
  }

  render() {

    const { changeCurrency, products, currency } = this.props;
    const totalCount = this.productsCount(products);

    return (
      <div className="App">
        <Header show={this.show} items={totalCount} changeCurrency={changeCurrency} />
        <CartOverlay
          products={products}
          currency={currency}
          onClose={this.close}
          show={this.state.show}
        />
        <Routes>
          <Route path="/" element={<PLP />} />
          <Route path="clothes" element={<ClothesPLP />} />
          <Route path="tech" element={<TechPLP />} />
          <Route path="product-details/:id" style={{ color: 'inherit', textDecoration: 'inherit' }} element={<PDP />} />
          <Route path="cart" element={<CartPage />} />
        </Routes>
      </div>
    );
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
    changeCurrency: (symbol) => dispatch(currencyChange(symbol))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
