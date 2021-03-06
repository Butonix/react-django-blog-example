import * as types from "../types/actionTypes";
import { currentIp } from "./currentIp";

const url = currentIp;

//Method called for each action to determine headers sent
export const determineHeaders = () => {
  let token_conv =
    localStorage.getItem("goog_access_token_conv") ||
    localStorage.getItem("token");
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
  return headers;
};

// COMMENT LIST ACTIONS
const isFetchingCommentsForPost = () => ({
  type: types.IS_FETCHING_COMMENTS_FOR_POST
});
const fetchCommentsForPostSuccess = commentArr => ({
  type: types.FETCH_COMMENTS_FOR_POST_SUCCESS,
  commentArr
});
const fetchCommentsForPostFailure = err => ({
  type: types.FETCH_COMMENTS_FOR_POST_FAILURE,
  err
});

function fetchCommentsForPost(postId) {
  return async function(dispatch) {
    try {
      let token_conv =
        (await localStorage.getItem("token")) ||
        localStorage.getItem("goog_access_token_conv");
      let headers = await determineHeaders();
      /*
         sending a request with the users token
         so we can display edit and delete icons next to the comment
         if the user is the owner of the comment
         if the user is not logged in headers is empty
      */
      headers = (await token_conv) === null ? {} : headers;
      dispatch(isFetchingCommentsForPost());
      let response = await fetch(`${url}/posts/${postId}/comments/`, {
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
  type: types.CREATE_COMMENT_FAILURE,
  err
});

function createCommentForPost(postId, commentText) {
  return async function(dispatch) {
    try {
      let headers = await determineHeaders();
      let response = await fetch(`${url}/posts/${postId}/comments/`, {
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

//COMMENT DETAIL ACTIONS

function deleteCommentForPost(postId, commentId) {
  return async function(dispatch) {
    let headers = await determineHeaders();
    let response = await fetch(
      `${url}/posts/${postId}/comments/${commentId}/`,
      {
        method: "DELETE",
        headers: headers
      }
    );
    return response;
  };
}

function editCommentForPost(postId, commentId, commentText) {
  return async function(dispatch) {
    let headers = await determineHeaders();
    let response = await fetch(
      `${url}/posts/${postId}/comments/${commentId}/`,
      {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({
          text: commentText
        })
      }
    );
    if (!response.ok) {
      throw new Error("Could not delete the requested commentreply.");
    }
    let responseJson = await response.json();
    return responseJson;
  };
}

// COMMENTREPLY LIST ACTIONS
function createCommentReply(postId, commentId, commentText) {
  return async function(dispatch) {
    try {
      let headers = await determineHeaders();
      let response = await fetch(
        `${url}/posts/${postId}/comments/${commentId}/commentreplies/`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            text: commentText
          })
        }
      );
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

//COMMENTREPLY DETAIL ACTIONS

function deleteCommentReply(postId, commentId, commentReplyId) {
  return async function(dispatch) {
    let headers = await determineHeaders();
    let response = await fetch(
      `${url}/posts/${postId}/comments/${commentId}/commentreplies/${commentReplyId}/`,
      {
        method: "DELETE",
        headers: headers
      }
    );
    return response;
  };
}

function editCommentReply(postId, commentId, commentReplyId, commentReplyText) {
  return async function(dispatch) {
    let headers = await determineHeaders();
    let response = await fetch(
      `${url}/posts/${postId}/comments/${commentId}/commentreplies/${commentReplyId}/`,
      {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({
          text: commentReplyText
        })
      }
    );
    let responseJson = await response.json();
    return responseJson;
  };
}

export {
  fetchCommentsForPost,
  createCommentForPost,
  createCommentReply,
  deleteCommentReply,
  deleteCommentForPost,
  editCommentForPost,
  editCommentReply
};
