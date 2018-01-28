// Imports for email login
import { unauthenticateAction } from "../actions/authActions";
import jwtDecode from "jwt-decode";
// Imports for google login
import URLSearchParams from "url-search-params";
//import { push } from "react-router-redux";
import {
  django_client_id,
  django_client_secret,
  url,
  convertGoogTokenSuccess
} from "../actions/googleAuthActions";

function jwt({ dispatch, getState }) {
  return next => action => {
    if (typeof action === "function") {
      if (localStorage.getItem("token") && localStorage.length > 0) {
        var tokenExpiration = jwtDecode(localStorage.getItem("token")).exp;
        console.log("Decoded token time", tokenExpiration);
        const timeLeft = tokenExpiration - new Date().getTime() / 1000;
        console.log("seconds remaining: ===", timeLeft);
        if (
          tokenExpiration &&
          tokenExpiration - new Date().getTime() / 1000 < 0
        ) {
          console.log("LESS THAN 0");
          return dispatch(unauthenticateAction(dispatch));
        }
        if (
          tokenExpiration &&
          tokenExpiration - new Date().getTime() / 1000 < 900
        ) {
          return fetch(`${url}/refresh-token/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token")
            },
            body: JSON.stringify({ token: localStorage.getItem("token") })
          })
            .then(response => response.json())
            .then(json => localStorage.setItem("token", json.token))
            .then(() => next(action));
        }
      } //check if the user has google_access_token
      if (
        localStorage.getItem("goog_access_token_conv") &&
        localStorage.length > 0
      ) {
        const googTokenExpirationTime = localStorage.getItem(
          "goog_access_token_expires_in"
        );
        // get the current unix epoch time in seconds
        const currentTime = Math.round(new Date().getTime() / 1000);
        const timeLeftGoog = googTokenExpirationTime - currentTime;
        console.log("token time left =======>", timeLeftGoog);
        // check if the token is expired, if so log the user out
        if (googTokenExpirationTime && timeLeftGoog <= 0) {
          console.log("TOKEN IS EXPIRED");
          localStorage.removeItem("goog_access_token_conv");
          localStorage.removeItem("goog_refresh_token_conv");
          localStorage.removeItem("goog_access_token_expires_in");
          localStorage.removeItem("goog_avatar_url");
          localStorage.removeItem("goog_name");
          localStorage.removeItem("goog_email");
          //dispatch(push("/"));
          return dispatch({ type: "GOOGLE_LOGOUT" });
        }
        // check if the token is going to expire in less than 30mins - refresh it
        if (googTokenExpirationTime && timeLeftGoog <= 1800) {
          var searchParams = new URLSearchParams();
          searchParams.set("grant_type", "refresh_token");
          searchParams.set("client_id", django_client_id);
          searchParams.set("client_secret", django_client_secret);
          searchParams.set(
            "refresh_token",
            localStorage.getItem("goog_refresh_token_conv")
          );
          fetch(`${url}/sauth/token/`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: searchParams
          })
            .then(response => response.json())
            .then(json => dispatch(convertGoogTokenSuccess(json)))
            .then(() => next(action));
        }
      } else {
        return next(action);
      }
    } else {
      return next(action);
    }
  };
}

export default jwt;
