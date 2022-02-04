import React, { Component } from "react";
import Logo from "./logo";
import Navigation from "./navigation";
import Actions from "./actions";

class Header extends Component {

  render() {
    return (
      <header>
        <Navigation />
        <Logo />
        <Actions oncliked={this.props.oncliked} />
      </header>
    );
  }
}

export default Header;