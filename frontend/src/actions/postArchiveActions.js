import * as types from "../types/actionTypes";

const url = "http://127.0.0.1:8000";

const isFetching = () => ({ type: types.FETCHING_POSTS_FOR_ARCHIVE });
const receivePostsForArchive = posts => ({
	type: types.FETCH_POSTS_FOR_ARCHIVE_SUCCESS,
	posts
});
const fetchPostsForArchiveFailed = err => ({
	type: types.FETCH_POSTS_FOR_ARCHIVE_FAILURE,
	err
});

function fetchPostsForArchive(archiveDate) {
	return async function(dispatch) {
		dispatch(isFetching());
		try {
			let response = await fetch(`${url}/${archiveDate}/`);
			if (!response.ok) {
				throw new Error("The requested archive does not exist.");
			}
			let responseJson = await response.json();
			return dispatch(receivePostsForArchive(responseJson));
		} catch (err) {
			return dispatch(fetchPostsForArchiveFailed(err));
		}
	};
}

export { fetchPostsForArchive };
