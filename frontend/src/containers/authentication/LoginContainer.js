import { connect } from "react-redux";

import Login from "../../components/authentication/Login";
import { loginAction, authenticateAction } from "../../actions/authActions";

function mapDispatchToProps(dispatch) {
	return {
		loginAction: data => dispatch(loginAction(data)),
		authenticateAction: (userData, history, dispatch) =>
			dispatch(authenticateAction(userData, history, dispatch))
	};
}

export default connect(null, mapDispatchToProps)(Login);
