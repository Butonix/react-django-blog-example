import React, { Component } from "react";
import moment from "moment";

import "./detail-styles.css";
import Form from "./Form";
import EditForm from "./EditForm";
import CommentReply from "../../containers/Comments/CommentReplyContainer";

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
    return (
      <div className="container">
        <div className="row">
          <div className="comments col-md-11" id="comments">
            <div className="comment">
              <div className="comment-avatar col-md-1 col-sm-2 text-center pr-1">
                {this.props.user_avatar === "/profile_images/pr_image.png" ||
                this.props.user_avatar === "" ? (
                  <Avatar
                    className="mx-auto rounded-circle img-fluid"
                    name={this.props.user}
                    round
                    size={60}
                  />
                ) : (
                  <img
                    className="mx-auto rounded-circle img-fluid"
                    src={`http://127.0.0.1:8000/media/${
                      this.props.user_avatar
                    }`}
                    alt="avatarxz"
                    style={{ maxWidth: "80px", maxHeight: "80px" }}
                  />
                )}
              </div>
              <div className="comment-content col-md-12 col-sm-10">
                <span>
                  <b>{this.props.user} </b>
                </span>
                made a post.
                <h6 className="text-muted time">
                  {moment(this.props.posted_on).fromNow()}
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
                    {this.props.text}
                  </p>
                </div>
                <button
                  style={{ cursor: "pointer" }}
                  className="btn btn-link"
                  onClick={() =>
                    this.setState({
                      toggleTextForm: !this.state.toggleTextForm
                    })
                  }
                >
                  <i className="fa fa-reply" aria-hidden="true" title="Reply" />{" "}
                  Reply
                </button>
                <span
                  style={{
                    display:
                      this.props.current_user === this.props.user &&
                      (this.props.isAuthenticatedGoogle ||
                        this.props.isAuthenticatedEmail)
                        ? "inline-block"
                        : "none"
                  }}
                >
                  <button
                    style={{ cursor: "pointer" }}
                    className="btn btn-link"
                    onClick={() => this.toggleEditForm()}
                  >
                    <i className="fas fa-edit" aria-hidden="true" /> Edit
                  </button>
                  <button
                    style={{ cursor: "pointer" }}
                    className="btn btn-link"
                    onClick={() =>
                      this.deleteCommentAndFetch(
                        this.props.postId,
                        this.props.id
                      )
                    }
                  >
                    <i className="fa fa-trash" aria-hidden="true" /> Delete
                  </button>
                </span>
                <span
                  style={{
                    display: this.state.toggleEditForm ? "block" : "none"
                  }}
                >
                  <EditForm
                    prevText={this.props.text}
                    fetchCommentsForPost={this.props.fetchCommentsForPost}
                    editCommentForPost={this.props.editCommentForPost}
                    commentId={this.props.id}
                    postId={this.props.postId}
                    toggleEditForm={this.toggleEditForm}
                    editFormState={this.state.toggleEditForm}
                  />
                </span>
                <span
                  style={{
                    display: this.state.toggleTextForm ? "block" : "none"
                  }}
                >
                  <Form
                    fetchCommentsForPost={this.props.fetchCommentsForPost}
                    createCommentReply={this.props.createCommentReply}
                    commentId={this.props.id}
                    postId={this.props.postId}
                    toggleTextForm={this.toggleTextForm}
                    isAuthenticatedGoogle={this.props.isAuthenticatedGoogle}
                    isAuthenticatedEmail={this.props.isAuthenticatedEmail}
                    textFormState={this.state.toggleTextForm}
                  />
                </span>
              </div>
              {this.props.comment_replies &&
                this.props.comment_replies.map(reply => {
                  return (
                    <CommentReply
                      key={reply.id}
                      {...reply}
                      commentId={this.props.id}
                      postId={this.props.postId}
                      current_user={this.props.current_user}
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
