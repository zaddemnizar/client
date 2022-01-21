import React, {Component} from "react";
import Logo from "./logo";
import Navigation from "./navigation";
import Actions from "./actions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
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