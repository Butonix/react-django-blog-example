import { connect } from "react-redux";

import { registerAction } from "../../actions/authActions";
import { RegisterF } from "../../components/authentication/RegisterF";

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerAction: data => dispatch(registerAction(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterF);
