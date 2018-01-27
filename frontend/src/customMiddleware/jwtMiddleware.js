import { unauthenticateAction } from "../actions/authActions";
import jwtDecode from "jwt-decode";
const url = "http://127.0.0.1:8000";

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
        } else {
          return next(action);
        }
      }
    }
    return next(action);
  };
}

export default jwt;
