import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import PropTypes from "prop-types";

import "../index.css";
import SearchModal from "./reusableComponents/SearchModal";
import GoogleLoginButton from "../containers/GoogleAuth/GoogleLoginButtonContainer";
import GoogleLogoutButton from "../containers/GoogleAuth/GoogleLogoutButtonContainer";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  userIsAuthenticatedGoogle() {
    if (this.props.goog_auth.isAuthenticated) {
      return [
        <NavItem key="goog-logout">
          <GoogleLogoutButton
            className="nav-link"
            history={this.props.history}
          />
        </NavItem>
      ];
    }
  }
  userIsAuthenticatedEmail() {
    if (this.props.authenticated) {
      return [
        <UncontrolledDropdown
          nav
          className="nav-item dropdown"
          key="email-auth"
        >
          <DropdownToggle nav caret className="nav-link">
            Account
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu">
            <DropdownItem className="inverse-dropdown">
              <span key="signout" onClick={() => this.props.logoutAction()}>
                <NavLink tag={Link} to="/signout">
                  Log out
                </NavLink>
              </span>
            </DropdownItem>
            <DropdownItem className="inverse-dropdown">
              <NavLink tag={Link} to="/changepassword">
                Change Password
              </NavLink>
            </DropdownItem>
            <DropdownItem className="inverse-dropdown">
              <NavLink tag={Link} to="/profile">
                Profile
              </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ];
    }
  }

  userIsNotAuthenticated() {
    if (!this.props.authenticated && !this.props.goog_auth.isAuthenticated) {
      return [
        <UncontrolledDropdown nav className="nav-item dropdown" key="not-auth">
          <DropdownToggle nav caret className="nav-link">
            Login
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu">
            <span style={{ display: "block", textAlign: "center" }}>
              <GoogleLoginButton />
            </span>
            <DropdownItem className="inverse-dropdown">
              <NavLink
                tag={Link}
                to="/login"
                key="log-in"
                activeClassName="active"
                exact
              >
                Site Log in
              </NavLink>
            </DropdownItem>
            <DropdownItem className="inverse-dropdown">
              <NavLink
                tag={Link}
                to="/register"
                key="sign-up"
                activeClassName="active"
                exact
              >
                Register
              </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ];
    }
  }

  render() {
    console.log("NAVBAR PROPS___", this.props);
    return (
      <div>
        <Navbar
          color="faded"
          className="navbar navbar-toggleable-md navbar-inverse bg-inverse"
          expand="md"
        >
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar style={{ margin: "auto" }}>
              <NavItem>
                <NavLink tag={Link} to="/" activeClassName="active" exact>
                  Home
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={Link} to="/about" activeClassName="active" exact>
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/contact"
                  activeClassName="active"
                  exact
                >
                  Contact
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/browse" activeClassName="active" exact>
                  Browse
                </NavLink>
              </NavItem>
              {this.userIsNotAuthenticated()}
              {this.userIsAuthenticatedEmail()}
              {this.userIsAuthenticatedGoogle()}

              <NavItem className="mt-2 ml-3">
                <SearchModal
                  className="modal-scrollbar"
                  buttonLabel="Search..."
                />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

PropTypes.NavBar = {
  logoutAction: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  authenticated: PropTypes.bool
};

export default NavBar;
