import React, { Component } from "react";
import Logo from "./logo";
import Navigation from "./navigation";
import Actions from "./Actions";

class Header extends Component {

  render() {
    return (
      <header>
        <Navigation />
        <Logo />
        <Actions
          show={this.props.show}
          items={this.props.items}
          changeCurrency={this.props.changeCurrency}
        />
      </header>
    );
  }
}

export default Header;