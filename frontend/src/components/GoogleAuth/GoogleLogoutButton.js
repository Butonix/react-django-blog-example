import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";

import gapi from "gapi-client";

class GoogleLogoutButton extends Component {
  componentDidMount() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          "254472747355-6umtrkcedqn00tg7ec17l705ftttam0r.apps.googleusercontent.com"
      });
    });
  }
  signOut = dispatch => {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2
      .signOut()
      .then(() => {
        console.log("User signed out.");
        localStorage.removeItem("goog_avatar_url");
        localStorage.removeItem("goog_name");
        localStorage.removeItem("goog_email");
      })
      .then(() => this.props.googleLogoutAction())
      .then(() => this.props.history.push("/"));
  };
  render() {
    return (
      <GoogleLogout
        buttonText="Logout"
        onLogoutSuccess={this.signOut}
        className="loginBtn loginBtn--google"
      />
    );
  }
}

export default GoogleLogoutButton;
