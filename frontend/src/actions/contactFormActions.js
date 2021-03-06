import * as types from "../types/actionTypes";
import { currentIp } from "./currentIp";

const url = currentIp;

const submittingContactForm = () => ({ type: types.SUBMITTING_CONTACT_FORM });
const submitContactFormSuccess = () => ({
  type: types.SUBMIT_CONTACT_FORM_SUCCESS
});
const submitContactFormFail = err => ({
  type: types.SUBMIT_CONTACT_FORM_FAILURE,
  err
});

function submitContactForm(data) {
  return async function(dispatch) {
    try {
      dispatch(submittingContactForm());
      let response = await fetch(`${url}/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error(
          "Please fill the required fields and complete the captcha."
        );
      }
      let responseJson = await response.json();
      dispatch(submitContactFormSuccess());
      return responseJson;
    } catch (err) {
      dispatch(submitContactFormFail(err));
      return err;
    }
  };
}

export { submitContactForm };
