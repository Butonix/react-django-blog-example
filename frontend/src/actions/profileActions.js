import * as types from "../types/actionTypes";

const url = "http://127.0.0.1:8000";

const isFetching = () => ({ type: types.FETCHING_PROFILE_DATA });
const fetchProfileDataSuccess = userData => ({
	type: types.FETCH_PROFILE_DATA_SUCCESS,
	userData
});
const fetchProfileDataFail = err => ({
	type: types.FETCH_PROFILE_DATA_FAILURE,
	err
});

function fetchProfileData(username) {
	return async function(dispatch) {
		dispatch(isFetching());
		try {
			let response = await fetch(`${url}/users/${username}/`);
			if (response.status !== 200) {
				throw new Error("The requested User does not exist.");
			} else {
				let responseJson = await response.json();
				return dispatch(fetchProfileDataSuccess(responseJson));
			}
		} catch (err) {
			return dispatch(fetchProfileDataFail(err));
		}
	};
}

export { fetchProfileData };
