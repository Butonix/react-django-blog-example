import { connect } from "react-redux";

import EditProfile from "../../components/userProfile/EditProfile";
import {
  fetchProfileData,
  updateProfileData
} from "../../actions/userProfileActions.js";

const mapStateToProps = state => ({
  user_profile: state.user_profile
});
const mapDispatchToProps = dispatch => ({
  fetchProfileData: () => dispatch(fetchProfileData()),
  updateProfileData: newData => dispatch(updateProfileData(newData))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
