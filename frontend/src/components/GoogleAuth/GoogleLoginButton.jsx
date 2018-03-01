import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";

class GoogleLoginButton extends Component {
  render() {
    const responseGoogleSuccess = response => {
      if (response.profileObj) {
        localStorage.setItem("goog_avatar_url", response.profileObj.imageUrl);
        localStorage.setItem("goog_name", response.profileObj.name);
        localStorage.setItem("goog_email", response.profileObj.email);
      }
      this.props.convertGoogleToken(response.Zi.access_token);
    };
    const responseGoogleFailure = response => {
      console.log(response);
    };

    return (
      <GoogleLogin
        clientId="254472747355-6umtrkcedqn00tg7ec17l705ftttam0r.apps.googleusercontent.com"
        buttonText="Google"
        onSuccess={responseGoogleSuccess}
        onFailure={responseGoogleFailure}
        className="btn btn-danger"
        style={{ width: "100%" }}
        prompt="select_account"
        redirectUri="http://localhost:3000/secret/"
      />
    );
  }
}

export default GoogleLoginButton;