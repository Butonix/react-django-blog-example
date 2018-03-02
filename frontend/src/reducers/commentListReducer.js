import * as types from "../types/actionTypes";

const initialState = {
  isFetchingComments: false,
  commentArr: [],
  err: null
};

function commentListReducer(state = initialState, action) {
  switch (action.type) {
    case types.IS_FETCHING_COMMENTS_FOR_POST:
      return { ...state, err: null, isFetchingComments: true };
    case types.FETCH_COMMENTS_FOR_POST_SUCCESS:
      return {
        ...state,
        commentArr: action.commentArr,
        isFetchingComments: false
      };
    case types.FETCH_COMMENTS_FOR_POST_FAILURE:
      return { ...state, err: action.err, isFetchingComments: false };
    case types.CREATE_COMMENT_FAILURE:
      return { ...state, err: action.err, isFetchingComments: false };
    case types.GOOGLE_LOGOUT:
      let commentArray = state.commentArr.map(commentObj =>
        Object.assign({}, commentObj, { current_user: "" })
      );
      return {
        ...state,
        commentArr: commentArray
      };
    default:
      return state;
  }
}

export default commentListReducer;

//my page was scrolling to top on fetch bacause i had commentArr: [], in my IS_FETCHING_COMMENTS
//action
