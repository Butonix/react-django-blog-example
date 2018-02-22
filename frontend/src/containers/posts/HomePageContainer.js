import { connect } from "react-redux";

import { fetchPosts, clearPosts } from "../../actions/postActions";
import HomePage from "../../components/posts/HomePage";

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth
});
const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: paginationPage => dispatch(fetchPosts(paginationPage)),
    clearPosts: () => dispatch(clearPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
