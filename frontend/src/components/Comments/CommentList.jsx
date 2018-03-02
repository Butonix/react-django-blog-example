import React, { Component } from "react";
import CommentDetail from "../../containers/Comments/CommentDetailContainer";
import Form from "./Form";

class CommentList extends Component {
  componentDidMount() {
    if (this.props.postId) {
      return this.props.fetchCommentsForPost(this.props.postId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.isAuthenticatedGoogle !== this.props.isAuthenticatedGoogle &&
      this.props.postId
    ) {
      return this.props.fetchCommentsForPost(this.props.postId);
    }
    if (prevProps.postId !== this.props.postId) {
      return this.props.fetchCommentsForPost(this.props.postId);
    }
  }
  render() {
    return (
      <div>
        {this.props.comments.err && (
          <div className="alert alert-danger" role="alert">
            {this.props.comments.err.message}
          </div>
        )}
        {!this.props.comments.isFetchingComments &&
          !this.props.isFetchingPost && (
            <span>
              <div className="card my-4">
                <h5 className="card-header">Leave a Comment:</h5>
                <div className="card-body" />
                <Form
                  createCommentForPost={this.props.createCommentForPost}
                  fetchCommentsForPost={this.props.fetchCommentsForPost}
                  postId={this.props.postId}
                  isAuthenticatedGoogle={this.props.isAuthenticatedGoogle}
                  isAuthenticatedEmail={this.props.isAuthenticatedEmail}
                />
              </div>
              <div>
                {this.props.comments.commentArr.map(comment => (
                  <CommentDetail
                    key={comment.id}
                    {...comment}
                    postId={this.props.postId}
                  />
                ))}
              </div>
            </span>
          )}
      </div>
    );
  }
}

export default CommentList;
