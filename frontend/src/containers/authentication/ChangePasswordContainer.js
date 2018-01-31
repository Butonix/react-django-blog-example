import { connect } from "react-redux";
import { changePassword } from "../../actions/changePasswordActions";
import { ChangePassword } from "../../components/authentication/ChangePassword";

const mapStateToProps = state => ({ change_password: state.change_password });
const mapDispatchToProps = dispatch => ({
  changePassword: pwDetails => dispatch(changePassword(pwDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
