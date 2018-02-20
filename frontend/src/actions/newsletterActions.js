import * as types from "../types/actionTypes";
import { currentIp } from "./currentIp";

const url = currentIp;

const isSubscribing = () => ({ type: types.IS_SUBSCRIBING });
const subscribeSuccess = () => ({ type: types.SUBSCRIBE_SUCCESS });
const subscribeFailed = err => ({ type: types.SUBSCRIBE_FAILURE, err });

function subscribe(email) {
  return function(dispatch) {
    dispatch(isSubscribing());
    fetch(`${url}/newsletter/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Invalid or Existing Email Address");
        } else {
          dispatch(subscribeSuccess());
          return response;
        }
      })
      .catch(err => dispatch(subscribeFailed(err)));
  };
}

export { subscribe };
