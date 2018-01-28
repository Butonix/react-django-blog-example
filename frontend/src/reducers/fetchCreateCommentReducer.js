const initialState = {
  isFetchingComments: false,
  commentArr: [],
  err: null
};

function fetchCreatecommentReducer(state = initialState, action) {
  switch (action.type) {
    case "IS_FETCHING_COMMENTS":
      return { ...state, err: null, isFetchingComments: true };
    case "FETCH_COMMENTS_SUCCESS":
      return {
        ...state,
        commentArr: action.commentArr,
        isFetchingComments: false
      };
    case "FETCH_COMMENTS_FAILURE":
      return { ...state, err: action.err, isFetchingComments: false };
    case "CREATE_COMMENT_FAILURE":
      return { ...state, err: action.err };
    case "GOOGLE_LOGOUT":
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

export default fetchCreatecommentReducer;

//my page was scrolling to top on fetch bacause i had commentArr: [], in my IS_FETCHING_COMMENTS
//action
