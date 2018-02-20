import * as types from "../types/actionTypes";
import { currentIp } from "./currentIp";

const url = currentIp;

const filteringPosts = () => ({ type: types.FILTERING_POSTS });
const filterPostsSuccess = posts => ({
  type: types.FILTER_POSTS_SUCCESS,
  posts
});
const filterPostsFailure = err => ({ type: types.FILTER_POSTS_FAILURE, err });

function filterPosts(query) {
  return async function(dispatch) {
    dispatch(filteringPosts());
    try {
      let response = await fetch(`${url}/posts/?q=${query}`);
      if (!response.ok) {
        throw new Error("The requested Post was not found.");
      }
      let responseJson = await response.json();
      return dispatch(filterPostsSuccess(responseJson));
    } catch (e) {
      return dispatch(filterPostsFailure(e));
    }
  };
}

export { filterPosts };
