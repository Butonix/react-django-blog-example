import * as types from "../types/actionTypes";

const url = "http://127.0.0.1:8000";

const isFetching = () => ({ type: types.FETCHING_POSTS_FOR_CATEGORY });
const receivePostsForCategory = posts => ({
	type: types.FETCH_POSTS_FOR_CATEGORY_SUCCESS,
	posts
});
const fetchPostsForCategoryFailed = err => ({
	type: types.FETCH_POSTS_FOR_CATEGORY_FAILURE,
	err
});

function fetchPostsForCategory(categoryType) {
	return async function(dispatch) {
		dispatch(isFetching());
		try {
			let response = await fetch(`${url}/category/${categoryType}/`);
			if (!response.ok) {
				throw new Error("The requested Category does not exist.");
			}
			let responseJson = await response.json();
			return dispatch(receivePostsForCategory(responseJson));
		} catch (err) {
			return dispatch(fetchPostsForCategoryFailed(err));
		}
	};
}

export { fetchPostsForCategory };
