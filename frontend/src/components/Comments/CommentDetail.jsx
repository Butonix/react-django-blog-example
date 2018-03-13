import React, { Component } from "react";
import moment from "moment";

import Form from "./Form";
import EditForm from "./EditForm";
import CommentReply from "../../containers/Comments/CommentReplyContainer";
import EditIcon from "../icons/edit.png";
import DeleteIcon from "../icons/delete.png";
import ReplyIcon from "../icons/reply.png";

import Avatar from "react-avatar";

class CommentDetail extends Component {
  constructor(props) {
    super(props);
    this.toggleTextForm = this.toggleTextForm.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
  }

  state = {
    toggleTextForm: false,
    toggleEditForm: false
  };

  toggleTextForm() {
    return this.setState({ toggleTextForm: !this.state.toggleTextForm });
  }

  toggleEditForm() {
    return this.setState({ toggleEditForm: !this.state.toggleEditForm });
  }

  deleteCommentAndFetch(postId, commentId) {
    this.props.deleteCommentForPost(postId, commentId).then(() => {
      !this.props.err && this.props.fetchCommentsForPost(postId);
    });
  }

  render() {
    const {
      user_avatar,
      user,
      posted_on,
      text,
      isAuthenticatedGoogle,
      isAuthenticatedEmail,
      current_user,
      postId,
      id,
      fetchCommentsForPost,
      editCommentForPost,
      createCommentReply,
      comment_replies
    } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="comments col-md-11" id="comments">
            <div className="comment">
              <div className="comment-avatar col-md-1 col-sm-2 text-center pr-1">
                {user_avatar === "/profile_images/pr_image.png" ||
                user_avatar === "" ? (
                  <Avatar
                    className="mx-auto rounded-circle img-fluid"
                    name={user}
                    round
                    size={60}
                  />
                ) : (
                  <img
                    className="mx-auto rounded-circle img-fluid"
                    src={`http://127.0.0.1:8000/media/${user_avatar}`}
                    alt="avatarxz"
                    style={{
                      maxWidth: "80px",
                      maxHeight: "80px"
                    }}
                  />
                )}
              </div>
              <div className="comment-content col-md-12 col-sm-10">
                <span>
                  <b>{user} </b>
                </span>
                made a post.
                <h6 className="text-muted time">
                  {moment(posted_on).fromNow()}
                </h6>
                <div className="comment-body">
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
                        toggleTextForm: !this.state.toggleTextForm
                      })
                    }
                  >
                    <img src={ReplyIcon} className="mb-1" alt="rep icn" /> Reply
                  </button>
                </span>
                <span
                  style={{
                    display:
                      current_user === user &&
                      (isAuthenticatedGoogle || isAuthenticatedEmail)
                        ? "inline-block"
                        : "none"
                  }}
                >
                  <button
                    style={{ cursor: "pointer" }}
                    className="btn btn-link"
                    onClick={() => this.toggleEditForm()}
                  >
                    <img src={EditIcon} className="mb-1" alt="edit icn" /> Edit
                  </button>
                  <button
                    style={{ cursor: "pointer" }}
                    className="btn btn-link"
                    onClick={() => this.deleteCommentAndFetch(postId, id)}
                  >
                    <img src={DeleteIcon} className="mb-1" alt="delete icn" />{" "}
                    Delete
                  </button>
                </span>
                <span
                  style={{
                    display: this.state.toggleEditForm ? "block" : "none"
                  }}
                >
                  <EditForm
                    prevText={text}
                    fetchCommentsForPost={fetchCommentsForPost}
                    editCommentForPost={editCommentForPost}
                    commentId={id}
                    postId={postId}
                    toggleEditForm={this.toggleEditForm}
                    editFormState={this.state.toggleEditForm}
                  />
                </span>
                <span
                  style={{
                    display: this.state.toggleTextForm ? "block" : "none"
                  }}
                >
                  {(isAuthenticatedEmail || isAuthenticatedGoogle) && (
                    <Form
                      fetchCommentsForPost={fetchCommentsForPost}
                      createCommentReply={createCommentReply}
                      commentId={id}
                      postId={postId}
                      toggleTextForm={this.toggleTextForm}
                      isAuthenticatedGoogle={isAuthenticatedGoogle}
                      isAuthenticatedEmail={isAuthenticatedEmail}
                      textFormState={this.state.toggleTextForm}
                    />
                  )}
                </span>
              </div>
              {comment_replies &&
                comment_replies.map(reply => {
                  return (
                    <CommentReply
                      key={reply.id}
                      {...reply}
                      commentId={id}
                      postId={postId}
                      current_user={current_user}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentDetail;
