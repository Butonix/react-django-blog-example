import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import NavBar from "../components/NavBar";
import { logoutAction } from "../actions/authActions";
import { fetchPosts } from "../actions/postActions";

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    goog_auth: state.goog_auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutAction: () => dispatch(logoutAction()),
    fetchPosts: () => dispatch(fetchPosts())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
