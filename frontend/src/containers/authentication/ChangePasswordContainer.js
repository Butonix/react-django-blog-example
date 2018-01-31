import { connect } from "react-redux";
import { changePassword } from "../../actions/changePasswordActions";
import { ChangePassword } from "../../components/authentication/ChangePassword";

const mapStateToProps = state => ({ change_password: state.change_password });
const mapDispatchToProps = dispatch => ({
  changePassword: () => dispatch(changePassword())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
