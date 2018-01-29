const url = "http://127.0.0.1:8000";

const isFetchingCommentsForPost = () => ({
  type: "IS_FETCHING_COMMENTS_FOR_POST"
});
const fetchCommentsForPostSuccess = commentArr => ({
  type: "FETCH_COMMENTS_FOR_POST_SUCCESS",
  commentArr
});
const fetchCommentsForPostFailure = err => ({
  type: "FETCH_COMMENTS_FOR_POST_FAILURE",
  err
});

//Either get the google access token for Oauth2
//Or get the email login JWT token
let token_conv =
  localStorage.getItem("goog_access_token_conv") ||
  localStorage.getItem("token");

// Check which token the user has in order to log them in
// because the header prefixes can't be the same
// for dj_rest_JWT and soc_Oauth2 authorization
let headers =
  token_conv && token_conv.length > 35
    ? {
        "Content-Type": "application/json",
        Authorization: `JWT ${token_conv}`
      }
    : {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token_conv}`
      };

function fetchCommentsForPost(postId) {
  return async function(dispatch) {
    try {
      console.log("TOKEN_CONV", token_conv);
      // sending a request with the users token
      // so we can display edit and delete icons next to the comment
      // if the user is the owner of the comment
      // if the user is not logged in headers is empty
      headers = (await token_conv) === null ? {} : headers;
      dispatch(isFetchingCommentsForPost());
      let response = await fetch(`${url}/${postId}/comments/`, {
        method: "GET",
        headers: headers
      });
      if (!response.ok) {
        throw new Error("Unable to fetch the comments.");
      }
      let responseJson = await response.json();
      return dispatch(fetchCommentsForPostSuccess(responseJson));
    } catch (err) {
      return dispatch(fetchCommentsForPostFailure(err));
    }
  };
}

const createCommentFailure = err => ({
  type: "CREATE_COMMENT_FAILURE",
  err
});

function createCommentForPost(postId, commentText) {
  return async function(dispatch) {
    try {
      token_conv = await token_conv;
      headers = await headers;
      let response = await fetch(`${url}/${postId}/comments/`, {
        method: "POST",
        headers: headers,
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
  fetchCommentsForPost,
  createCommentForPost,
  createCommentReply,
  deleteCommentReply,
  deleteComment,
  editComment,
  editCommentReply
};
