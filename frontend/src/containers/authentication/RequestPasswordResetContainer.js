import { connect } from "react-redux";

import { RequestPasswordReset } from "../../components/authentication/RequestPasswordReset";
import { requestPasswordReset } from "../../actions/requestPasswordResetActions";

const mapStateToProps = state => ({
  request_password_reset: state.request_password_reset
});

const mapDispatchToProps = dispatch => ({
  requestPasswordReset: email => dispatch(requestPasswordReset(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RequestPasswordReset
);
