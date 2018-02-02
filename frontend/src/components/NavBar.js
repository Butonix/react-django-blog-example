import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import "../index.css";
import SearchModal from "./reusableComponents/SearchModal";
import GoogleLoginButton from "../containers/GoogleAuth/GoogleLoginButtonContainer";
import GoogleLogoutButton from "../containers/GoogleAuth/GoogleLogoutButtonContainer";

class Navbar extends Component {
  userIsAuthenticatedGoogle() {
    if (this.props.goog_auth.isAuthenticated) {
      return [
        <li className="nav-item" key="goog-logout-btn">
          <GoogleLogoutButton
            className="nav-link"
            history={this.props.history}
          />
        </li>
      ];
    }
  }
  userIsAuthenticatedEmail() {
    if (this.props.authenticated) {
      return [
        <li className="nav-item dropdown" key="dropdown-li">
          <a
            className="nav-link dropdown-toggle"
            href="http://localhost3000.com"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            key="account-email"
          >
            Account
          </a>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
            key="account-div"
          >
            <span key="signout" onClick={() => this.props.logoutAction()}>
              <NavLink to="/signout" className="dropdown-item">
                Log out
              </NavLink>
            </span>
            <NavLink to="/changepassword" className="dropdown-item">
              Change Password
            </NavLink>
            <NavLink to="/profile" className="dropdown-item">
              Profile
            </NavLink>
          </div>
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
            <span className="btn btn-social-icon btn-google">
              <GoogleLoginButton />
            </span>
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

  render() {
    return (
      <nav className="navbar navbar-inverse bg-inverse navbar-toggleable-sm">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse " id="navbarResponsive">
            <ul className="navbar-nav mr-auto">
              <li key="auth-app" className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  activeClassName="active"
                  exact
                >
                  Home
                </NavLink>
              </li>
              <li key="about-app" className="nav-item">
                <NavLink
                  to="/about"
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
                  className="nav-link "
                  activeClassName="active"
                  exact
                >
                  Contact
                </NavLink>
              </li>
              <li key="browse-posts" className="nav-item">
                <NavLink
                  to="/browse"
                  className="nav-link"
                  activeClassName="active"
                  exact
                >
                  Browse
                </NavLink>
              </li>
              {this.userIsNotAuthenticated()}
              {this.userIsAuthenticatedEmail()}
              {this.userIsAuthenticatedGoogle()}
            </ul>
            <ul className="navbar-nav ml-auto">
              <li key="search-app" className="nav-item mt-2">
                <SearchModal
                  className="modal-scrollbar"
                  buttonLabel="Search..."
                />
              </li>
            </ul>
          </div>
        </div>
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
