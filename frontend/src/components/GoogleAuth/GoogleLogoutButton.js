import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";

class GoogleLogoutButton extends Component {
  componentDidMount() {
    window.gapi.load("auth2", () => {
      this.auth2 = window.gapi.auth2.init({
        client_id:
          "254472747355-6umtrkcedqn00tg7ec17l705ftttam0r.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin"
      });
    });
  }

  render() {
    const signOut = dispatch => {
      var auth2 = window.gapi.auth2.getAuthInstance();
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
    return (
      <GoogleLogout
        buttonText=" Logout"
        className="btn btn-danger btn-sm mt-2"
        onLogoutSuccess={signOut}
        style={{ marginLeft: "15px", marginRight: "10px" }}
      />
    );
  }
}

export default GoogleLogoutButton;
