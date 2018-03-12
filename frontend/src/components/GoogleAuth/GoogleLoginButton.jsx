import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";

import scriptLoader from "react-async-script-loader";

class GoogleLoginButton extends Component {
  constructor(props) {
    super(props);
    this.responseGoogleSuccess = this.responseGoogleSuccess.bind(this);
  }
  // initGoogButton = () => {
  //   console.log("INITIALIZE THIS");
  //   return window.gapi.load("auth2", () => {
  //     this.auth2 = window.gapi.auth2.init({
  //       client_id:
  //         "254472747355-6umtrkcedqn00tg7ec17l705ftttam0r.apps.googleusercontent.com",
  //       cookiepolicy: "single_host_origin"
  //     });
  //   });
  // };

  initGoogButton = () => {
    console.log("rendering google signin button");
    window.gapi.signin2.render("my-signin2", {
      scope: "email",
      width: 180,
      height: 45,
      longtitle: false,
      theme: "light",
      onsuccess: this.responseGoogleSuccess,
      onfailure: this.responseGoogleFailure,
      prompt: "select_account"
    });

    window.gapi.load("auth2", function() {
      window.gapi.auth2.init();
    });
  };

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
  responseGoogleSuccess(response) {
    console.log("RESPONSE GOOOG SUCCESS_______", response);
    if (response.w3) {
      localStorage.setItem("goog_avatar_url", response.w3.Paa.imageUrl);
      localStorage.setItem("goog_name", response.w3.ig.name);
      localStorage.setItem("goog_email", response.w3.U3.email);
    }
    this.props.convertGoogleToken(response.Zi.access_token);
  }
  responseGoogleFailure(response) {
    console.log(response);
  }

  render() {
    return <div id="my-signin2" />;
  }
}
// <GoogleLogin
//   clientId="254472747355-6umtrkcedqn00tg7ec17l705ftttam0r.apps.googleusercontent.com"
//   buttonText="Google"
//   onSuccess={responseGoogleSuccess}
//   onFailure={responseGoogleFailure}
//   className="btn btn-danger"
//   style={{ width: "100%" }}
//   prompt="select_account"
//   redirectUri="http://localhost:3000/secret/"
// />

//export default GoogleLoginButton;

export default scriptLoader(["https://apis.google.com/js/client:platform.js"])(
  GoogleLoginButton
);
