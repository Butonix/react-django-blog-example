import { connect } from "react-redux";

import PostDetail from "../../components/posts/PostDetail";
import { fetchPostSlug, fetchPostPk } from "../../actions/postActions";

const mapStateToProps = state => ({ post: state.post });
const mapDispatchToProps = dispatch => ({
  fetchPostSlug: slug => dispatch(fetchPostSlug(slug)),
  fetchPostPk: paginateLink => dispatch(fetchPostPk(paginateLink))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
