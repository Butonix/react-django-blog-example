import { connect } from "react-redux";

import NewsLetter from "../../components/posts/NewsLetter";
import { subscribe } from "../../actions/newsletterActions";

const mapStateToProps = state => ({ newsletter: state.newsletter });

const mapDispatchToProps = dispatch => {
	return {
		subscribe: email => dispatch(subscribe(email))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsLetter);
