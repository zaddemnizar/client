import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { fetchCategories } from "../api/store";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }

  async componentDidMount() {
    const data = await fetchCategories();
    this.setState(prev => ({
      ...prev,
      categories: data
    }));
  }

  render() {
    return (
      <div className="navigation">
        {this.state.categories.map(category => (
          <NavLink
            key={category.name}
            to={`/${category.name}`}
            className={({ isActive }) =>
              isActive ? "headerBtnActive" : "headerBtnInactive"
            }
          >
            <label className="labelHeaderBtn">{category.name}</label>
          </NavLink>
        ))}
      </div>
    );
  }
}

export default Navigation;