import React, { Component } from "react";
import CommentDetail from "../../containers/Comments/CommentDetailContainer";
import Form from "./Form";

class CommentList extends Component {
  componentDidMount() {
    return this.props.fetchComments(this.props.postId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isAuthenticatedGoogle !== this.props.isAuthenticatedGoogle) {
      return this.props.fetchComments(this.props.postId);
    }
  }
  render() {
    return (
      <span>
        {this.props.comments.err && (
          <div className="alert alert-danger" role="alert">
            {this.props.comments.err.message}
          </div>
        )}
        <div className="card my-4">
          <h5 className="card-header">Leave a Comment:</h5>
          <div className="card-body" />
          <Form
            createComment={this.props.createComment}
            fetchComments={this.props.fetchComments}
            isAuthenticatedGoogle={this.props.isAuthenticatedGoogle}
          />
        </div>
        <ul>
          {this.props.comments.commentArr.map(comment => (
            <CommentDetail key={comment.id} {...comment} />
          ))}
        </ul>
      </span>
    );
  }
}

export default CommentList;
