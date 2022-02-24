import React, { Component } from "react";
import up from '../up.svg';
import down from '../down.svg';

const currencyList = ["$ USD", "£ GBP", "¥ JPY", "₽ RUB", "A$ AUD"];

export default class CurrencySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedOption: "$ USD",
      image: down
    };

    this.toggling = this.toggling.bind(this);
    this.onListClicked = this.onListClicked.bind(this);
  }

  toggling() {
    this.setState(prev => ({
      ...prev,
      isOpen: !this.state.isOpen,
      image: !this.state.isOpen ? up : down
    }));
  }

  onListClicked(value) {
    this.setState(prev => ({
      ...prev,
      isOpen: false,
      image: down,
      selectedOption: value
    }))
    this.props.changeCurrency(value.split(' ')[0]);
  };

  render() {
    return (
      <div className="currencyList">
        <div className="dropDownContainer">
          <div className="dropDownHeader" onClick={this.toggling}>
            {this.state.selectedOption || "$"}<img className="up" src={this.state.image} alt="arrow" />
          </div>
          {this.state.isOpen && (
            <div className="dropDownListContainer">
              <ul className="dropDownList">
                {currencyList.map(currency => (
                  <li className="listItem"
                    onClick={() => this.onListClicked(currency)}
                    key={(Math.random() + 1).toString(36).substring(7)}>
                    {currency}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div >
    );
  }
}