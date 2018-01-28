// Imports for email login
import { unauthenticateAction } from "../actions/authActions";
import jwtDecode from "jwt-decode";
// Imports for google login
import URLSearchParams from "url-search-params";
import { push } from "react-router-redux";
import {
  django_client_id,
  django_client_secret,
  url,
  convertGoogTokenSuccess
} from "../actions/googleAuthActions";

function refreshAuthToken({ dispatch, getState }) {
  return next => action => {
    if (typeof action === "function") {
      if (localStorage.getItem("token") && localStorage.length > 0) {
        const tokenExpiration = jwtDecode(localStorage.getItem("token")).exp;
        const currentTime = Math.round(new Date().getTime() / 1000);
        const timeLeft = tokenExpiration - currentTime;
        const emailLoginToken = localStorage.getItem("token");
        console.log("seconds remaining: ===", timeLeft);
        if (tokenExpiration && timeLeft < 0) {
          dispatch(push("/"));
          return dispatch(unauthenticateAction(dispatch));
        }
        if (tokenExpiration && timeLeft < 255) {
          return fetch(`${url}/refresh-token/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: emailLoginToken
            },
            body: JSON.stringify({ token: emailLoginToken })
          })
            .then(response => response.json())
            .then(json => localStorage.setItem("token", json.token))
            .then(() => next(action));
        }
        return next(action);
      } else if (
        localStorage.getItem("goog_access_token_conv") &&
        localStorage.length > 0
      ) {
        const googTokenExpirationTime = localStorage.getItem(
          "goog_access_token_expires_in"
        );
        // get the current unix epoch time in seconds
        const currentTimeGoog = Math.round(new Date().getTime() / 1000);
        const timeLeftGoog = googTokenExpirationTime - currentTimeGoog;
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
        return next(action);
      } else {
        return next(action);
      }
    } else {
      return next(action);
    }
  };
}

export default refreshAuthToken;
