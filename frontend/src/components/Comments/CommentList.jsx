import React, { Component } from "react";
import CommentDetail from "../../containers/Comments/CommentDetailContainer";
import Form from "./Form";
import Paper from "material-ui/Paper";

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
    const {
      comments,
      createCommentForPost,
      fetchCommentsForPost,
      isAuthenticatedGoogle,
      isAuthenticatedEmail,
      postId
    } = this.props;
    return (
      <div>
        {comments.err && (
          <div className="alert alert-danger" role="alert">
            {comments.err.message}
          </div>
        )}
        <Paper elevation={1}>
          <div className="card my-4">
            <h5 className="card-header">Leave a Comment:</h5>
            <div className="card-body" />
            <Form
              createCommentForPost={createCommentForPost}
              fetchCommentsForPost={fetchCommentsForPost}
              postId={postId}
              isAuthenticatedGoogle={isAuthenticatedGoogle}
              isAuthenticatedEmail={isAuthenticatedEmail}
            />
          </div>
        </Paper>
        <div>
          {comments.commentArr.map(comment => (
            <CommentDetail key={comment.id} {...comment} postId={postId} />
          ))}
        </div>
      </div>
    );
  }
}

export default CommentList;
