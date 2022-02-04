import React, { Component } from 'react'

class HeaderBtn extends Component {

  render() {
    return (
      <button className='headerBtn' >
        <label className='labelHeaderBtn' >{this.props.label}</label>
      </button>
    );
  }
}

export default HeaderBtn;
