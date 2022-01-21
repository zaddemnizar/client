import React, { Component}from "react";
import HeaderBtn from "./HeaderBtn";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
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