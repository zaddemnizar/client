import React, { Component } from "react";
import HeaderBtn from "./HeaderBtn";

class Navigation extends Component {

  render() {
    return (
      <div className="navigation">
        <HeaderBtn className="headerBtn" label="women" />
        <HeaderBtn className="headerBtn" label="men" />
        <HeaderBtn className="headerBtn" label="kids" />
      </div>
    );
  }
}

export default Navigation;