import { connect } from "react-redux";

import { fetchPosts } from "../../actions/postActions";
import HomePage from "../../components/posts/HomePage";

const mapStateToProps = state => ({
	posts: state.posts
});
const mapDispatchToProps = dispatch => {
	return {
		fetchPosts: () => dispatch(fetchPosts())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
