import React, {Component} from 'react'

class HeaderBtn extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }
  render() { 
    return (
      <button className='headerBtn' >
        <label className='labelHeaderBtn' >{this.props.label}</label>
      </button>
        );
    }
}
 
export default HeaderBtn;
