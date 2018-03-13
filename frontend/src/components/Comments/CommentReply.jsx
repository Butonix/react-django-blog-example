import React, { Component } from "react";
import moment from "moment";
import Form from "./Form";
import EditForm from "./EditForm";
import EditIcon from "../icons/edit.png";
import DeleteIcon from "../icons/delete.png";
import ReplyIcon from "../icons/reply.png";

import Avatar from "react-avatar";

class CommentReply extends Component {
  constructor(props) {
    super(props);
    this.toggleTextFormReply = this.toggleTextFormReply.bind(this);
    this.toggleEditFormReply = this.toggleEditFormReply.bind(this);
  }
  state = {
    toggleTextFormReply: false,
    toggleEditFormReply: false
  };

  toggleTextFormReply() {
    return this.setState({
      toggleTextFormReply: !this.state.toggleTextFormReply
    });
  }
  toggleEditFormReply() {
    return this.setState({
      toggleEditFormReply: !this.state.toggleEditFormReply
    });
  }

  deleteReplyAndFetch(postId, commentId, commentReplyId) {
    this.props
      .deleteCommentReply(postId, commentId, commentReplyId)
      .then(() => this.props.fetchCommentsForPost(postId));
  }

  render() {
    const {
      id,
      user,
      posted_on,
      text,
      isAuthenticatedEmail,
      isAuthenticatedGoogle,
      current_user,
      postId,
      commentId,
      fetchCommentsForPost,
      editCommentReply,
      createCommentReply
    } = this.props;
    return (
      <div className="ml-5" key={id}>
        <div>
          <div id="comments">
            <div className="comment">
              <div className="comment-avatar col-md-1 col-sm-2 text-center pr-1">
                <Avatar
                  className="mx-auto rounded-circle img-fluid"
                  name={user}
                  round
                  size={60}
                />
              </div>
              <div className="comment-content col-md-12 col-sm-12">
                <span>
                  <b>{user} </b>
                </span>
                made a post.
                <h6 className="text-muted time">
                  {moment(posted_on).fromNow()}
                </h6>
                <div className="post-description">
                  <p
                    style={{
                      display: "flex",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      textAlign: "justify",
                      marginTop: "5px"
                    }}
                  >
                    {text}
                  </p>
                  <div className="stats" />
                </div>
                <span
                  style={{
                    display:
                      isAuthenticatedGoogle || isAuthenticatedEmail
                        ? "inline-block"
                        : "none"
                  }}
                >
                  <button
                    style={{ cursor: "pointer" }}
                    className="btn btn-link"
                    onClick={() =>
                      this.setState({
                        toggleTextFormReply: !this.state.toggleTextFormReply
                      })
                    }
                  >
                    <img src={ReplyIcon} className="mb-1" alt="rep icn" /> Reply{" "}
                    Reply
                  </button>
                </span>
                <span
                  style={{
                    display: current_user === user ? "inline-block" : "none"
                  }}
                >
                  <button
                    style={{ cursor: "pointer" }}
                    className="btn btn-link"
                    onClick={this.toggleEditFormReply}
                  >
                    <img src={EditIcon} className="mb-1" alt="edit icn" /> Edit
                  </button>
                  <button
                    style={{ cursor: "pointer" }}
                    className="btn btn-link"
                    onClick={() =>
                      this.deleteReplyAndFetch(postId, commentId, id)
                    }
                  >
                    <img src={DeleteIcon} className="mb-1" alt="delete icn" />{" "}
                    Delete
                  </button>
                </span>
              </div>

              <span
                style={{
                  display: this.state.toggleEditFormReply ? "block" : "none"
                }}
              >
                <EditForm
                  prevText={text}
                  fetchCommentsForPost={fetchCommentsForPost}
                  editCommentReply={editCommentReply}
                  commentId={commentId}
                  postId={postId}
                  commentReplyId={id}
                  toggleEditFormReply={this.toggleEditFormReply}
                  stateEditFormReply={this.state.toggleEditFormReply}
                />
              </span>
              <span
                style={{
                  display: this.state.toggleTextFormReply ? "block" : "none"
                }}
              >
                {(isAuthenticatedEmail || isAuthenticatedGoogle) && (
                  <Form
                    fetchCommentsForPost={fetchCommentsForPost}
                    createCommentReply={createCommentReply}
                    commentId={commentId}
                    postId={postId}
                    toggleTextFormReply={this.toggleTextFormReply}
                    isAuthenticatedGoogle={isAuthenticatedGoogle}
                    isAuthenticatedEmail={isAuthenticatedEmail}
                    stateTextFormReply={this.state.toggleTextFormReply}
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentReply;
