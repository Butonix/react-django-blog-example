import { connect } from "react-redux";

import { EditProfile } from "../../components/userProfile/EditProfile";
import { fetchProfileData } from "../../actions/userProfileActions.js";

const mapStateToProps = state => ({
  user_profile: state.user_profile
});
const mapDispatchToProps = dispatch => ({
  fetchProfileData: username => dispatch(fetchProfileData(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
