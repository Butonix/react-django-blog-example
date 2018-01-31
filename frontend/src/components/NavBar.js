import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import "../index.css";
import SearchModal from "./reusableComponents/SearchModal";
import GoogleLoginButton from "../containers/GoogleAuth/GoogleLoginButtonContainer.js";
import GoogleLogoutButton from "../containers/GoogleAuth/GoogleLogoutButtonContainer.js";

class Navbar extends Component {
  userIsAuthenticatedGoogle() {
    if (this.props.goog_auth.isAuthenticated) {
      return [
        <li className="nav-item" key="goog-logout-btn">
          <GoogleLogoutButton history={this.props.history} />
        </li>
      ];
    }
  }
  userIsAuthenticatedEmail() {
    if (this.props.authenticated) {
      return [
        <li
          key="signout"
          onClick={() => this.props.logoutAction()}
          className="nav-item"
        >
          <NavLink to="/signout" className="nav-link">
            Log out
          </NavLink>
        </li>,
        <li key="change-password" className="nav-item">
          <NavLink to="/changepassword" className="nav-link">
            Change Password
          </NavLink>
        </li>
      ];
    }
  }

  userIsNotAuthenticated() {
    if (!this.props.authenticated && !this.props.goog_auth.isAuthenticated) {
      return [
        <li className="nav-item dropdown" key="dropdown-li">
          <a
            className="nav-link dropdown-toggle"
            href="http://localhost3000.com"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            key="account"
          >
            Login
          </a>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
            key="account-div"
          >
            <GoogleLoginButton />
            <NavLink
              to="/login"
              className="dropdown-item"
              key="log-in"
              activeClassName="active"
              exact
            >
              Site Log in
            </NavLink>
            <NavLink
              to="/register"
              className="dropdown-item"
              key="sign-up"
              activeClassName="active"
              exact
            >
              Register
            </NavLink>
          </div>
        </li>
      ];
    }
  }

  userIsAuthenticated() {
    if (this.props.authenticated || this.props.goog_auth.isAuthenticated) {
      return [
        <li key="secret" className="nav-item">
          <NavLink
            to="/secret"
            className="nav-link"
            activeClassName="active"
            exact
          >
            Secret
          </NavLink>
        </li>
      ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
        <ul className="navbar-nav mr-auto">
          <li key="auth-app" className="nav-item">
            <NavLink to="/" className="nav-link" activeClassName="active" exact>
              Home
            </NavLink>
          </li>
          <li key="about-app" className="nav-item">
            <NavLink
              to="/users/opmftw"
              className="nav-link"
              activeClassName="active"
              exact
            >
              About
            </NavLink>
          </li>
          <li key="contact-app" className="nav-item">
            <NavLink
              to="/contact"
              className="nav-link"
              activeClassName="active"
              exact
            >
              Contact
            </NavLink>
          </li>
          {this.userIsNotAuthenticated()}
          {this.userIsAuthenticated()}
          {this.userIsAuthenticatedEmail()}
          {this.userIsAuthenticatedGoogle()}
        </ul>
        <ul className="navbar-nav ml-auto">
          <li key="search-app" className="nav-item">
            <SearchModal className="modal-scrollbar" buttonLabel="Search..." />
          </li>
        </ul>
      </nav>
    );
  }
}

PropTypes.NavBar = {
  logoutAction: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  authenticated: PropTypes.bool
};

export default Navbar;
