import React, { Component } from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Header from './components/header';
import WelcomePage from "./pages/WelcomePage";
import PDP from "./pages/PDP";
import PLP from "./pages/PLP";
import CartPage from "./pages/CartPage";
import { currencyChange } from "./Redux/actions/actions";
import CartOverlay from "./components/CartOverlay";
import { fetchCategories } from './api/store';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      categories: []
    }
    this.close = this.close.bind(this);
    this.show = this.show.bind(this);
  }

  async componentDidMount() {
    const cat = await fetchCategories();
    this.setState(prev => ({
      ...prev,
      categories: cat
    }));
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
          {this.state.categories.map((category => (
            <Route
              key={category.name}
              path={category.name}
              element={<PLP category={category.name} />} />
          )))}
          <Route path="*" element={<WelcomePage />} />
          <Route path="product-details/:id" element={<PDP />} />
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
