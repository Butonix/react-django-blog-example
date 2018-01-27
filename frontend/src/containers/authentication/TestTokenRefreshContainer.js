import { refreshTokenIfExpiring } from "../../actions/authActions";
import TestTokenRefresh from "../../components/authentication/TestTokenRefresh";

import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
	return {
		dispatch: dispatch,
		refreshTokenIfExpiring: () => dispatch(refreshTokenIfExpiring())
	};
}

export default connect(null, mapDispatchToProps)(TestTokenRefresh);
