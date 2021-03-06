import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";

import SearchModal from "./reusableComponents/SearchModal";
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

  toggleNavbarOnClick = () => {
    if (window.innerWidth <= 989) {
      return this.toggle();
    }
  };

  userIsAuthenticatedGoogle() {
    if (this.props.goog_auth.isAuthenticated) {
      return [
        <NavItem key="goog-logout" onClick={this.toggleNavbarOnClick}>
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
                <NavLink
                  tag={Link}
                  to="/signout"
                  onClick={this.toggleNavbarOnClick}
                >
                  Log out
                </NavLink>
              </span>
            </DropdownItem>
            <DropdownItem className="inverse-dropdown">
              <NavLink
                tag={Link}
                to="/changepassword"
                onClick={this.toggleNavbarOnClick}
              >
                Change Password
              </NavLink>
            </DropdownItem>
            <DropdownItem className="inverse-dropdown">
              <NavLink
                tag={Link}
                to="/profile"
                onClick={this.toggleNavbarOnClick}
              >
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
            <DropdownItem className="inverse-dropdown">
              <NavLink
                tag={Link}
                to="/login"
                key="log-in"
                activeClassName="active"
                exact
                onClick={this.toggleNavbarOnClick}
              >
                Log in
              </NavLink>
            </DropdownItem>
            <DropdownItem className="inverse-dropdown">
              <NavLink
                tag={Link}
                to="/register"
                key="sign-up"
                activeClassName="active"
                exact
                onClick={this.toggleNavbarOnClick}
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
    return (
      <div>
        <Navbar
          color="faded"
          className="navbar navbar-toggleable-md navbar-inverse bg-inverse"
          expand="md"
        >
          <NavbarToggler
            onClick={this.toggle}
            name="toggle-the-navigation-bar"
            aria-label="toggle-navigation-bar"
          />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar style={{ margin: "auto" }}>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/"
                  activeClassName="active"
                  exact
                  onClick={this.toggleNavbarOnClick}
                >
                  Home
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  tag={Link}
                  to="/about"
                  activeClassName="active"
                  exact
                  onClick={this.toggleNavbarOnClick}
                >
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/contact"
                  activeClassName="active"
                  onClick={this.toggleNavbarOnClick}
                  exact
                >
                  Contact
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/browse"
                  activeClassName="active"
                  exact
                  onClick={this.toggleNavbarOnClick}
                >
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

export default NavBar;
