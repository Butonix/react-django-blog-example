import * as types from "../types/actionTypes";

let initialState = {
  isFetching: false,
  err: null,
  snippets: {
    count: "",
    next: "",
    previous: "",
    results: []
  }
};

function postListReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_POSTS:
      return { ...state, isFetching: true, err: null };
    case types.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        snippets: {
          ...action.posts,
          results: [...state.snippets.results, ...action.posts.results]
        },
        err: null
      };
    case types.FETCH_POSTS_FAILURE:
      return { ...state, isFetching: false, err: action.err };
    default:
      return state;
  }
}

export default postListReducer;
