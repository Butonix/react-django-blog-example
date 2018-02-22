import { connect } from "react-redux";

import { passwordResetConfirm } from "../../actions/passwordResetConfirmActions";
import { PasswordResetConfirm } from "../../components/authentication/PasswordResetConfirm";

function mapStateToProps(state) {
  return { password_reset_confirm: state.password_reset_confirm };
}

function mapDispatchToProps(dispatch) {
  return {
    passwordResetConfirm: (new_password1, new_password2, uid, token) =>
      dispatch(passwordResetConfirm(new_password1, new_password2, uid, token))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  PasswordResetConfirm
);
