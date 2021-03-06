import * as types from "../types/actionTypes";
import { currentIp } from "./currentIp";

const url = currentIp;

function authenticateAction(userData, history, dispatch) {
  localStorage.setItem("token", userData.token);
  localStorage.setItem("username", userData.user.username);
  history.push("/");
  return dispatch({ type: types.AUTHENTICATED });
}

function unauthenticateAction(dispatch) {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  return dispatch({ type: types.UNAUTHENTICATED });
}

function registerAction(data) {
  return async function() {
    let response = await fetch(`${url}/registration/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    let responseJson = response.json();
    return responseJson;
  };
}

function loginAction(data) {
  return async function() {
    let response = await fetch(`${url}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    let responseJson = await response.json();
    return responseJson;
  };
}

function logoutAction() {
  return async function(dispatch) {
    try {
      await fetch(`${url}/auth/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        }
      });
      return dispatch(unauthenticateAction(dispatch));
    } catch (e) {
      return dispatch(unauthenticateAction(dispatch));
    }
  };
}

export {
  registerAction,
  loginAction,
  authenticateAction,
  logoutAction,
  unauthenticateAction
};
