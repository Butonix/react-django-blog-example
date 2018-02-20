import * as types from "../types/actionTypes";
import { currentIp } from "./currentIp";

const url = currentIp;

const isFetchingProfileData = () => ({ type: types.FETCHING_PROFILE_DATA });
const fetchProfileDataSuccess = userData => ({
  type: types.FETCH_PROFILE_DATA_SUCCESS,
  userData
});
const fetchProfileDataFail = err => ({
  type: types.FETCH_PROFILE_DATA_FAILURE,
  err
});

function fetchProfileData() {
  return async function(dispatch) {
    dispatch(isFetchingProfileData());
    try {
      let token_conv = await localStorage.getItem("token");
      let response = await fetch(`${url}/profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token_conv}`
        }
      });
      if (!response.ok) {
        throw new Error("Unable to load the requested Profile..");
      } else {
        let responseJson = await response.json();
        return dispatch(fetchProfileDataSuccess(responseJson));
      }
    } catch (err) {
      return dispatch(fetchProfileDataFail(err));
    }
  };
}

function updateProfileData(newData) {
  return async function(dispatch) {
    try {
      let token_conv = await localStorage.getItem("token");
      let response = await fetch(`${url}/profile/`, {
        method: "PATCH",
        headers: {
          Authorization: `JWT ${token_conv}`,
          Accept: "application/json"
        },
        body: newData
      });
      if (!response.ok) {
        throw new Error("Unable to update the requested Profile.");
      }
      let responseJson = await response.json();
      return responseJson;
    } catch (err) {
      return err;
    }
  };
}

export { fetchProfileData, updateProfileData };
