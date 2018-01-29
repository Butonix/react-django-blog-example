import { connect } from "react-redux";
import {
  createCommentReply,
  fetchCommentsForPost,
  deleteComment,
  editComment
} from "../../actions/commentActions";
import CommentDetail from "../../components/Comments/CommentDetail";

const mapStateToProps = state => ({
  isAuthenticatedGoogle: state.goog_auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  createCommentReply: (commentId, commentText) =>
    dispatch(createCommentReply(commentId, commentText)),
  fetchCommentsForPost: postId => dispatch(fetchCommentsForPost(postId)),
  deleteComment: commentId => dispatch(deleteComment(commentId)),
  editComment: (commentId, commentText) =>
    dispatch(editComment(commentId, commentText))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentDetail);
