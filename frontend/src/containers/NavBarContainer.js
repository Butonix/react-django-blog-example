import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import NavBar from "../components/NavBar";
import { logoutAction } from "../actions/authActions";

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    goog_auth: state.goog_auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutAction: () => dispatch(logoutAction())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
