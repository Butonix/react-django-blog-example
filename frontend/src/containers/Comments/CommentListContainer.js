import { connect } from "react-redux";

import CommentList from "../../components/Comments/CommentList";
import {
  fetchCommentsForPost,
  createCommentForPost
} from "../../actions/commentActions";

const mapStateToProps = state => ({
  comments: state.comments,
  isAuthenticatedGoogle: state.goog_auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  fetchCommentsForPost: postId => dispatch(fetchCommentsForPost(postId)),
  createCommentForPost: (postId, commentText) =>
    dispatch(createCommentForPost(postId, commentText))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
