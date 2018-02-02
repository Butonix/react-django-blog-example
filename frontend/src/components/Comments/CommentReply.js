import React, { Component } from "react";
import moment from "moment";
import Form from "./Form";
import EditForm from "./EditForm";

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
      <div className="row ml-5" key={this.props.id}>
        <div className="col-sm-8">
          <div className="panel panel-white post panel-shadow">
            <div className="post-heading">
              <div className="pull-left image">
                <img
                  src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y"
                  className="img-circle avatar"
                  alt="fuck off alt"
                />
              </div>
              <div className="pull-left meta">
                <div className="title h5">
                  <span>
                    <b>{this.props.user} </b>
                  </span>
                  made a post.
                </div>
                <h6 className="text-muted time">
                  {moment(this.props.posted_on).fromNow()}
                </h6>
              </div>
            </div>
            <div className="post-description">
              <p
                style={{
                  display: "flex",
                  whiteSpace: "normal",
                  wordBreak: "break-word"
                }}
              >
                {this.props.text}
              </p>
              <div className="stats" />
            </div>
            <button
              onClick={() =>
                this.setState({
                  toggleTextFormReply: !this.state.toggleTextFormReply
                })
              }
            >
              <i className="fa fa-reply" aria-hidden="true" title="Reply" />
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
                onClick={() =>
                  this.deleteReplyAndFetch(
                    this.props.postId,
                    this.props.commentId,
                    this.props.id
                  )
                }
              >
                <i className="fa fa-trash" aria-hidden="true" />Delete
              </button>
              <button onClick={this.toggleEditFormReply}>
                <i className="fa fa-pencil-square-o" aria-hidden="true" />
                Edit
              </button>
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
            </span>
          </div>

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
    );
  }
}

export default CommentReply;
