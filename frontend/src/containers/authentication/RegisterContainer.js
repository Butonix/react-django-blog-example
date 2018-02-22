import { connect } from "react-redux";

import { registerAction } from "../../actions/authActions";
import { verifyRegistrationMessage } from "../../actions/postActions.js";
import { Register } from "../../components/authentication/Register";

function mapDispatchToProps(dispatch) {
  return {
    registerAction: data => dispatch(registerAction(data)),
    verifyRegistrationMessage: () => dispatch(verifyRegistrationMessage())
  };
}

export default connect(null, mapDispatchToProps)(Register);
