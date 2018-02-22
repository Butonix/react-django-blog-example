import * as types from "../types/actionTypes";
import { currentIp } from "./currentIp";

const url = currentIp;

const passwordResetConfirmSuccess = message => ({
  type: types.PASSWORD_RESET_CONFIRM_SUCCESS,
  message
});
const passwordResetConfirmFailure = err => ({
  type: types.PASSWORD_RESET_CONFIRM_FAILURE,
  err
});

function passwordResetConfirm(new_password1, new_password2, uid, token) {
  return async function(dispatch) {
    try {
      let response = await fetch(`${url}/auth/password/reset/confirm/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ new_password1, new_password2, uid, token })
      });

      if (!response.ok) {
        throw new Error("Invalid or expired link, please try again.");
      }
      let responseJson = await response.json();
      return dispatch(passwordResetConfirmSuccess(responseJson));
    } catch (err) {
      return dispatch(passwordResetConfirmFailure(err));
    }
  };
}

export { passwordResetConfirm };
