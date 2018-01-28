const url = "http://127.0.0.1:8000";

const isFetchingComments = () => ({ type: "IS_FETCHING_COMMENTS" });
const fetchCommentsSuccess = commentArr => ({
  type: "FETCH_COMMENTS_SUCCESS",
  commentArr
});
const fetchCommentsFailure = err => ({
  type: "FETCH_COMMENTS_FAILURE",
  err
});

function fetchComments() {
  return async function(dispatch) {
    try {
      let token_conv =
        (await localStorage.getItem("goog_access_token_conv")) ||
        localStorage.getItem("github_access_token_conv");
      console.log("TOKEN_CONV", token_conv);
      let headers = (await token_conv)
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token_conv}`
          }
        : {
            "Content-Type": "application/json"
          };
      dispatch(isFetchingComments());
      let response = await fetch(`${url}/comments/`, {
        method: "GET",
        headers: headers
      });
      if (!response.ok) {
        throw new Error("Unable to fetch the comments.");
      }
      let responseJson = await response.json();
      return dispatch(fetchCommentsSuccess(responseJson));
    } catch (err) {
      return dispatch(fetchCommentsFailure(err));
    }
  };
}

const createCommentFailure = err => ({
  type: "CREATE_COMMENT_FAILURE",
  err
});

function createComment(commentText) {
  return async function(dispatch) {
    try {
      let token_conv =
        (await localStorage.getItem("goog_access_token_conv")) ||
        localStorage.getItem("github_access_token_conv");
      let response = await fetch(`${url}/comments/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token_conv}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: commentText
        })
      });
      if (!response.ok) {
        throw new Error(
          "Authorization is required to post a comment, please log in."
        );
      }
      let responseJson = await response.json();
      return responseJson;
    } catch (err) {
      return dispatch(createCommentFailure(err));
    }
  };
}
