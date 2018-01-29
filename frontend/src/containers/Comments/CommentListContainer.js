import { connect } from "react-redux";

import CommentList from "../../components/Comments/CommentList";
import { fetchComments, createComment } from "../../actions/commentActions";

const mapStateToProps = state => ({
  comments: state.comments,
  isAuthenticatedGoogle: state.goog_auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  fetchComments: postId => dispatch(fetchComments(postId)),
  createComment: commentText => dispatch(createComment(commentText))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
