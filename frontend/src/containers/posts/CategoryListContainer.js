import { connect } from "react-redux";

import CategoryList from "../../components/posts/CategoryList";
import { fetchPostsForCategory } from "../../actions/categoryActions";

const mapStateToProps = state => ({ category_posts: state.category_posts });
const mapDispatchToProps = dispatch => {
	return {
		fetchPostsForCategory: categoryType =>
			dispatch(fetchPostsForCategory(categoryType))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
