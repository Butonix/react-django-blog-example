import About from "../../components/author/About";
import { fetchProfileData } from "../../actions/userProfileActions";

import { connect } from "react-redux";

const mapStateToProps = state => ({ user_profile: state.user_profile });

const mapDispatchToProps = dispatch => {
  return {
    fetchProfileData: username => dispatch(fetchProfileData(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
