import * as types from "../types/actionTypes";

const url = "http://127.0.0.1:8000";

/* LIST ACTIONS */
const isFetching = () => ({ type: types.FETCHING_POSTS });
const receivePosts = posts => ({ type: types.FETCH_POSTS_SUCCESS, posts });
const fetchPostsFailed = err => ({ type: types.FETCH_POSTS_FAILURE, err });

function fetchPosts(paginationPage) {
  return async function(dispatch) {
    dispatch(isFetching());
    try {
      paginationPage = (await paginationPage) || 1;
      let response = await fetch(
        `${url}/posts/paginated/?page=${paginationPage}`
      );
      let responseJson = await response.json();
      return dispatch(receivePosts(responseJson));
    } catch (err) {
      return dispatch(fetchPostsFailed(err));
    }
  };
}

const clearPosts = () => ({ type: types.CLEAR_POSTS });

/* DETAIL ACTIONS */

const isFetchingDetail = () => ({ type: types.FETCHING_POST });
const receivePost = post => ({ type: types.FETCH_POST_SUCCESS, post });
const fetchPostFailed = err => ({ type: types.FETCH_POST_FAILURE, err });

function fetchPostSlug(slug) {
  return async function(dispatch) {
    dispatch(isFetchingDetail());
    try {
      let response = await fetch(`${url}/posts/${slug}/`);
      if (!response.ok) {
        throw new Error("The requested Post does not exist.");
      }
      let responseJson = await response.json();
      return dispatch(receivePost(responseJson));
    } catch (err) {
      return dispatch(fetchPostFailed(err));
    }
  };
}

function fetchPostPk(pk) {
  return async function(dispatch) {
    dispatch(isFetchingDetail());
    try {
      let response = await fetch(`${url}/posts/${pk}/`);
      if (!response.ok) {
        throw new Error("The requested Post does not exist.");
      }
      let responseJson = await response.json();
      return dispatch(receivePost(responseJson));
    } catch (err) {
      return dispatch(fetchPostFailed(err));
    }
  };
}

export { fetchPosts, clearPosts, fetchPostSlug, fetchPostPk };
