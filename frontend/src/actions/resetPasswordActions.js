import * as types from "../types/actionTypes";
import { currentIp } from "./currentIp";

const url = currentIp;

const verifyRegistrationEmailSuccess = message => ({
  type: types.VERIFY_REGISTRATION_EMAIL_SUCCESS,
  message
});
const verifyRegistrationEmailFailure = err => ({
  type: types.VERIFY_REGISTRATION_EMAIL_FAILURE,
  err
});

function resetPasswordAction(email) {
  return async function(dispatch) {
    try {
      let response = await fetch(`${url}/auth/password/reset/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: `${verificationKey}` })
      });

      if (!response.ok) {
        throw new Error("Incorrect key.");
      }
      let responseJson = await response.json();
      return dispatch(verifyRegistrationEmailSuccess(responseJson));
    } catch (err) {
      return dispatch(verifyRegistrationEmailFailure(err));
    }
  };
}

export { verifyRegistrationEmail };
