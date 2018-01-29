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

function fetchComments(postId) {
  return async function(dispatch) {
    try {
      let token_conv =
        (await localStorage.getItem("goog_access_token_conv")) ||
        localStorage.getItem("token");
      console.log("TOKEN_CONV", token_conv);
      // sending a request with the users token
      // so we can display edit and delete icons next to the comment
      // if the user is the owner of the comment
      let headers =
        (await token_conv) && token_conv.length > 35
          ? {
              "Content-Type": "application/json",
              Authorization: `JWT ${token_conv}`
            }
          : {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token_conv}`
            };
      // if the user is not logged in headers is empty
      headers = (await token_conv) === null ? {} : headers;
      dispatch(isFetchingComments());
      let response = await fetch(`${url}/${postId}/comments/`, {
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

function createCommentReply(commentId, commentText) {
  return async function(dispatch) {
    try {
      let token_conv =
        (await localStorage.getItem("goog_access_token_conv")) ||
        localStorage.getItem("github_access_token_conv");
      let response = await fetch(`${url}/commentreplies/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token_conv}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          comment: commentId,
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

const isDeletingCommentReply = () => ({ type: "IS_DELETING_COMMENT_REPLY" });
const deleteCommentReplyFailure = err => ({
  type: "DELETE_COMMENT_REPLY_FAILURE",
  err
});

function deleteCommentReply(commentReplyId) {
  return async function(dispatch) {
    dispatch(isDeletingCommentReply());
    try {
      let token_conv =
        (await localStorage.getItem("goog_access_token_conv")) ||
        localStorage.getItem("github_access_token_conv");
      let response = await fetch(`${url}/commentreplies/${commentReplyId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token_conv}`
        }
      });
      if (!response.ok) {
        throw new Error("Could not delete the requested commentreply.");
      }
      return response;
    } catch (err) {
      return dispatch(deleteCommentReplyFailure(err));
    }
  };
}

function deleteComment(commentId) {
  return async function(dispatch) {
    //dispatch(isDeletingCommentReply());
    try {
      let token_conv =
        (await localStorage.getItem("goog_access_token_conv")) ||
        localStorage.getItem("github_access_token_conv");
      let response = await fetch(`${url}/comments/${commentId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token_conv}`
        }
      });
      if (!response.ok) {
        throw new Error("Could not delete the requested commentreply.");
      }
      return response;
    } catch (err) {
      console.log(err);
      //return dispatch(deleteCommentReplyFailure(err));
    }
  };
}

function editComment(commentId, commentText) {
  return async function(dispatch) {
    try {
      let token_conv =
        (await localStorage.getItem("goog_access_token_conv")) ||
        localStorage.getItem("github_access_token_conv");

      let response = await fetch(`${url}/comments/${commentId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token_conv}`
        },
        body: JSON.stringify({
          text: commentText
        })
      });
      if (!response.ok) {
        throw new Error("Could not delete the requested commentreply.");
      }
      let responseJson = await response.json();
      return responseJson;
    } catch (err) {
      console.log(err);
      //return dispatch(deleteCommentReplyFailure(err));
    }
  };
}

function editCommentReply(commentReplyId, commentReplyText) {
  return async function(dispatch) {
    try {
      let token_conv =
        (await localStorage.getItem("goog_access_token_conv")) ||
        localStorage.getItem("github_access_token_conv");

      let response = await fetch(`${url}/commentreplies/${commentReplyId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token_conv}`
        },
        body: JSON.stringify({
          text: commentReplyText
        })
      });
      if (!response.ok) {
        throw new Error("Could not delete the requested commentreply.");
      }
      let responseJson = await response.json();
      return responseJson;
    } catch (err) {
      console.log(err);
      //return dispatch(deleteCommentReplyFailure(err));
    }
  };
}

export {
  fetchComments,
  createComment,
  createCommentReply,
  deleteCommentReply,
  deleteComment,
  editComment,
  editCommentReply
};
