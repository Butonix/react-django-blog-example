import { connect } from "react-redux";
import CommentReply from "../../components/Comments/CommentReply";
import {
  createCommentReply,
  fetchCommentsForPost,
  deleteCommentReply,
  editCommentReply
} from "../../actions/commentActions";

const mapStateToProps = state => ({
  isAuthenticatedGoogle: state.goog_auth.isAuthenticated,
  isAuthenticatedEmail: state.auth.authenticated
});

const mapDispatchToProps = dispatch => ({
  createCommentReply: (postId, commentId, commentText) =>
    dispatch(createCommentReply(postId, commentId, commentText)),
  fetchCommentsForPost: postId => dispatch(fetchCommentsForPost(postId)),
  deleteCommentReply: commentReplyId =>
    dispatch(deleteCommentReply(commentReplyId)),
  editCommentReply: (commentReplyId, commentReplyText) =>
    dispatch(editCommentReply(commentReplyId, commentReplyText))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentReply);
