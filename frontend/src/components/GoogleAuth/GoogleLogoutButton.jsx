import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";

import scriptLoader from "react-async-script-loader";

class GoogleLogoutButton extends Component {
  initGoogButton() {
    window.gapi.load("auth2", () => {
      this.auth2 = window.gapi.auth2.init({
        client_id:
          "254472747355-6umtrkcedqn00tg7ec17l705ftttam0r.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin"
      });
    });
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      console.log("COMP DID MOUNT_______");
      this.initGoogButton();
    }
  }
  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      // load finished
      if (isScriptLoadSucceed) {
        console.log("COMP WILL REC PROPS>>>>>>");
        this.initGoogButton();
      } else this.props.onError();
    }
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

//export default GoogleLogoutButton;

export default scriptLoader(["https://apis.google.com/js/client:platform.js"])(
  GoogleLogoutButton
);
