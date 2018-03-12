import React, { Component } from "react";
import scriptLoader from "react-async-script-loader";
import { withRouter } from "react-router-dom";

class GoogleLoginButton extends Component {
  constructor(props) {
    super(props);
    this.responseGoogleSuccess = this.responseGoogleSuccess.bind(this);
  }

  initGoogButton = () => {
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
      window.gapi.auth2.init({
        client_id:
          "254472747355-6umtrkcedqn00tg7ec17l705ftttam0r.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin"
      });
    });
  };

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      console.log("COMPONENT DID MOUNT");
      this.initGoogButton();
    }
  }

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      if (isScriptLoadSucceed) {
        console.log("COMPONENT WILL RECEIVE PROPS>>>>>>");
        this.initGoogButton();
      }
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.isScriptLoaded && !this.props.isScriptLoaded) {
  //     if (this.props.isScriptLoadSucceed) {
  //       console.log("COMPONENT DID UPDATEW>>>>>");
  //       this.initGoogButton();
  //     }
  //   }
  // }
  responseGoogleSuccess(response) {
    if (response.w3) {
      localStorage.setItem("goog_avatar_url", response.w3.Paa.imageUrl);
      localStorage.setItem("goog_name", response.w3.ig.name);
      localStorage.setItem("goog_email", response.w3.U3.email);
    }
    this.props.convertGoogleToken(
      response.Zi.access_token,
      this.props.location.pathname
    );
  }
  responseGoogleFailure(response) {
    console.log(response);
  }

  render() {
    console.log("GOOG BUTTON PROPS", this.props);
    return <div id="my-signin2" />;
  }
}

export default withRouter(
  scriptLoader(["https://apis.google.com/js/client:platform.js"])(
    GoogleLoginButton
  )
);
