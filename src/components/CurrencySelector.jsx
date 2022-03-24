import React, { Component } from "react";
import OutsideClickHandler from 'react-outside-click-handler';
import up from '../up.svg';
import down from '../down.svg';
import { fetchCurrencies } from "../api/store";

const currencyList = [];

export default class CurrencySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedOption: "$ USD",
      image: down
    };
    this.menuRef = React.createRef();
    this.toggling = this.toggling.bind(this);
    this.onListClicked = this.onListClicked.bind(this);
  }

  async componentDidMount() {
    const data = await fetchCurrencies();
    data.map(currency => {
      currencyList.push(currency.symbol.concat(' ', currency.label));
    });
  };

  toggling() {
    this.setState(prev => ({
      ...prev,
      isOpen: !this.state.isOpen,
      image: !this.state.isOpen ? up : down
    }));
  };

  outsideClick = () => {
    this.setState(prev => ({
      ...prev,
      isOpen: false,
      image: down
    }));
  };

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
            {this.state.selectedOption || "$ USD"}<img className="up" onClick={this.toggling} src={this.state.image} alt="arrow" />
          </div>
          {this.state.isOpen && (
            <OutsideClickHandler onOutsideClick={this.outsideClick}>
              <div className="dropDownListContainer">
                <ul ref={this.menuRef} className="dropDownList">
                  {currencyList.map(currency => (
                    <li className="listItem"
                      onClick={() => this.onListClicked(currency)}
                      key={(Math.random() + 1).toString(36).substring(7)}>
                      {currency}
                    </li>
                  ))}
                </ul>
              </div>
            </OutsideClickHandler>
          )}
        </div>
      </div >
    );
  }
}