import React, { Component } from 'react'
import logo from '../logo.svg';

export default class Logo extends Component {
  render() {
    return (
      <a href="/">
        <img src={logo} className="logo" alt="logo" />
      </a>
    );
  }
}