import * as types from "../types/actionTypes";
import { currentIp } from "./currentIp";

const url = currentIp;

const requestPasswordResetSuccess = message => ({
  type: types.REQUEST_PASSWORD_RESET_SUCCESS,
  message
});
const requestPasswordResetFailure = err => ({
  type: types.REQUEST_PASSWORD_RESET_FAILURE,
  err
});

function requestPasswordReset(email) {
  return async function(dispatch) {
    try {
      let response = await fetch(`${url}/auth/password/reset/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: `${email}` })
      });

      if (!response.ok) {
        throw new Error("Nonexistant email address, please try again.");
      }
      let responseJson = await response.json();
      return dispatch(requestPasswordResetSuccess(responseJson));
    } catch (err) {
      return dispatch(requestPasswordResetFailure(err));
    }
  };
}

export { requestPasswordReset };
