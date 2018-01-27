import { connect } from "react-redux";
import { filterPosts } from "../../actions/filterPostsActions";

import FilterPosts from "../../components/posts/FilterPosts";

function mapStateToProps(state) {
	return {
		posts_filtered: state.posts_filtered
	};
}

function mapDispatchToProps(dispatch) {
	return {
		filterPosts: query => dispatch(filterPosts(query))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterPosts);
