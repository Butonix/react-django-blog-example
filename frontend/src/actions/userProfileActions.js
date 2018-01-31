import * as types from "../types/actionTypes";

const url = "http://127.0.0.1:8000";

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

const isUpdatingProfileData = () => ({ type: "IS_UPDATING_PROFILE_DATA" });
const updateProfileDataSuccess = userData => ({
  type: "UPDATE_PROFILE_DATA_SUCCESS",
  userData
});
const updateProfileDataFailure = err => ({
  type: "UPDATE_PROFILE_DATA_FAILURE",
  err
});

function updateProfileData(newData) {
  return async function(dispatch) {
    dispatch(isUpdatingProfileData());
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
      // if (!response.ok) {
      //   throw new Error("Unable to load the requested Profile..");
      // }
      let responseJson = await response.json();
      return dispatch(updateProfileDataSuccess(responseJson));
    } catch (err) {
      return dispatch(updateProfileDataFailure(err));
    }
  };
}

export { fetchProfileData, updateProfileData };
