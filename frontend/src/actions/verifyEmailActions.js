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

function verifyRegistrationEmail(verificationKey) {
  return async function(dispatch) {
    try {
      let response = await fetch(`${url}/registration/verify-email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ key: `${verificationKey}` })
      });

      if (!response.ok) {
        console.log("HERE ----->>>>>");
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
