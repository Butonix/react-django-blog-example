import { connect } from "react-redux";

import PostArchive from "../../components/posts/PostArchive";
import { fetchPostsForArchive } from "../../actions/postArchiveActions";

const mapStateToProps = state => ({ post_archive: state.post_archive });
const mapDispatchToProps = dispatch => {
	return {
		fetchPostsForArchive: archiveDate =>
			dispatch(fetchPostsForArchive(archiveDate))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PostArchive);
