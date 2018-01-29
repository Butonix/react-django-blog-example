import { connect } from "react-redux";
import {
  createCommentReply,
  fetchCommentsForPost,
  deleteCommentForPost,
  editCommentForPost
} from "../../actions/commentActions";
import CommentDetail from "../../components/Comments/CommentDetail";

const mapStateToProps = state => ({
  isAuthenticatedGoogle: state.goog_auth.isAuthenticated,
  isAuthenticatedEmail: state.auth.authenticated
});

const mapDispatchToProps = dispatch => ({
  createCommentReply: (commentId, commentText) =>
    dispatch(createCommentReply(commentId, commentText)),
  fetchCommentsForPost: postId => dispatch(fetchCommentsForPost(postId)),
  deleteCommentForPost: (postId, commentId) =>
    dispatch(deleteCommentForPost(postId, commentId)),
  editCommentForPost: (postId, commentId, commentText) =>
    dispatch(editCommentForPost(postId, commentId, commentText))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentDetail);
