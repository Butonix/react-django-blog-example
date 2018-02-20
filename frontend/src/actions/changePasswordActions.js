import * as types from "../types/actionTypes";
import { currentIp } from "./currentIp";

const url = currentIp;

const isChangingPassword = () => ({ type: types.IS_CHANGING_PASSWORD });
const changePasswordSuccess = resp => ({
  type: types.CHANGE_PASSWORD_SUCCESS,
  resp
});
const changePasswordFailure = err => ({
  type: types.CHANGE_PASSWORD_FAILURE,
  err
});

function changePassword(pwDetails) {
  return async function(dispatch) {
    try {
      dispatch(isChangingPassword());
      let token_conv = await localStorage.getItem("token");
      let response = await fetch(`${url}/auth/password/change/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token_conv}`
        },
        body: JSON.stringify(pwDetails)
      });
      if (!response.ok) {
        throw new Error("Invalid credentials, please try again.");
      }
      let responseJson = await response.json();
      return dispatch(changePasswordSuccess(responseJson));
    } catch (err) {
      return dispatch(changePasswordFailure(err));
    }
  };
}

export { changePassword };
