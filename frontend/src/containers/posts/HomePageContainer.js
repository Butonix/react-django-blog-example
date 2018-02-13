import { connect } from "react-redux";

import { fetchPosts } from "../../actions/postActions";
import HomePage from "../../components/posts/HomePage";

const mapStateToProps = state => ({
  posts: state.posts
});
const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: paginationPage => dispatch(fetchPosts(paginationPage))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
