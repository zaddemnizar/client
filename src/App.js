import React, { Component } from "react";
import Header from './components/header';
import Main from './components/Main';
import { Provider } from "react-redux";
import store from "./app/store";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({
      show: true
    })
    console.log(this.state.show)
  };

  hideModal = () => {
    this.setState({
      show: false
    })
  };

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App;
