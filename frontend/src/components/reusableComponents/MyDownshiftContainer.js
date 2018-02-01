import { connect } from "react-redux";
import { filterPosts } from "../../actions/filterPostsActions.js";
import MyDownshift from "./MyDownshift";

const mapStateToProps = state => ({ posts_filtered: state.posts_filtered });

const mapDispatchToProps = dispatch => ({
  filterPosts: query => dispatch(filterPosts(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyDownshift);
