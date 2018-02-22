import { connect } from "react-redux";

import VerifyEmail from "../../components/authentication/VerifyEmail";
import { verifyRegistrationEmail } from "../../actions/verifyEmailActions";

const mapStateToProps = state => ({
  verify_email: state.verify_email
});

const mapDispatchToProps = dispatch => ({
  verifyRegistrationEmail: verificationKey =>
    dispatch(verifyRegistrationEmail(verificationKey))
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
