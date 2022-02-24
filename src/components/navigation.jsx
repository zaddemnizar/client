import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";


class Navigation extends Component {

  render() {
    return (
      <div className="navigation">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "headerBtnActive" : "headerBtnInactive"
          }
        >
          <label className="labelHeaderBtn">All</label>
        </NavLink>
        <NavLink
          to="/tech"
          className={({ isActive }) =>
            isActive ? "headerBtnActive" : "headerBtnInactive"
          }
        >
          <label className="labelHeaderBtn">tech</label>
        </NavLink>
        <NavLink
          to="/clothes"
          className={({ isActive }) =>
            isActive ? "headerBtnActive" : "headerBtnInactive"
          }
        >
          <label className="labelHeaderBtn">clothes</label>
        </NavLink>
      </div>
    );
  }
}

export default Navigation;