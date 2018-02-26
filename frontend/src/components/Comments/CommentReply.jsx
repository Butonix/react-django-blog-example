import React, { Component } from "react";
import moment from "moment";
import Form from "./Form";
import EditForm from "./EditForm";

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
    return (
      <div className="ml-5" key={this.props.id}>
        <div>
          <div id="comments">
            <div className="comment">
              <div className="comment-avatar col-md-1 col-sm-2 text-center pr-1">
                <Avatar
                  className="mx-auto rounded-circle img-fluid"
                  name={this.props.user}
                  round
                  size={60}
                />
              </div>
              <div className="comment-content col-md-12 col-sm-12">
                <span>
                  <b>{this.props.user} </b>
                </span>
                made a post.
                <h6 className="text-muted time">
                  {moment(this.props.posted_on).fromNow()}
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
                    {this.props.text}
                  </p>
                  <div className="stats" />
                </div>
                <button
                  style={{ cursor: "pointer" }}
                  className="btn btn-link"
                  onClick={() =>
                    this.setState({
                      toggleTextFormReply: !this.state.toggleTextFormReply
                    })
                  }
                >
                  <i className="fa fa-reply" aria-hidden="true" title="Reply" />{" "}
                  Reply
                </button>
                <span
                  style={{
                    display:
                      this.props.current_user === this.props.user
                        ? "inline-block"
                        : "none"
                  }}
                >
                  <button
                    style={{ cursor: "pointer" }}
                    className="btn btn-link"
                    onClick={this.toggleEditFormReply}
                  >
                    <i className="fas fa-edit" aria-hidden="true" /> Edit
                  </button>
                  <button
                    style={{ cursor: "pointer" }}
                    className="btn btn-link"
                    onClick={() =>
                      this.deleteReplyAndFetch(
                        this.props.postId,
                        this.props.commentId,
                        this.props.id
                      )
                    }
                  >
                    <i className="fa fa-trash" aria-hidden="true" /> Delete
                  </button>
                </span>
              </div>

              <span
                style={{
                  display: this.state.toggleEditFormReply ? "block" : "none"
                }}
              >
                <EditForm
                  prevText={this.props.text}
                  fetchCommentsForPost={this.props.fetchCommentsForPost}
                  editCommentReply={this.props.editCommentReply}
                  commentId={this.props.commentId}
                  postId={this.props.postId}
                  commentReplyId={this.props.id}
                  toggleEditFormReply={this.toggleEditFormReply}
                  stateEditFormReply={this.state.toggleEditFormReply}
                />
              </span>
              <span
                style={{
                  display: this.state.toggleTextFormReply ? "block" : "none"
                }}
              >
                <Form
                  fetchCommentsForPost={this.props.fetchCommentsForPost}
                  createCommentReply={this.props.createCommentReply}
                  commentId={this.props.commentId}
                  postId={this.props.postId}
                  toggleTextFormReply={this.toggleTextFormReply}
                  isAuthenticatedGoogle={this.props.isAuthenticatedGoogle}
                  isAuthenticatedEmail={this.props.isAuthenticatedEmail}
                  stateTextFormReply={this.state.toggleTextFormReply}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentReply;
