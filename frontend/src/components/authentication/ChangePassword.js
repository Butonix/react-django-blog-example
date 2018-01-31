import React, { Component } from "react";
import { withFormik } from "formik";
import Yup from "yup";

import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    textAlign: "center"
  },
  textField: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "2em",
    width: "60%"
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
    marginBottom: "15px",
    width: "10%"
  }
});

class InnerPwForm extends Component {
  render() {
    const {
      values,
      touched,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
      classes
    } = this.props;

    return (
      <span className={classes.container}>
        <h3 style={{ textAlign: "center" }}>Change Your Password</h3>
        {this.props.change_password.resp_message && (
          <div className="alert alert-success" role="alert">
            <strong>{this.props.change_password.resp_message}</strong>
          </div>
        )}
        {this.props.change_password.err && (
          <div className="alert alert-danger" role="alert">
            <strong>{this.props.change_password.err.message}</strong>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            name="old_password"
            placeholder="Enter your Old password"
            type="password"
            value={values.old_password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.old_password && touched.old_password}
            helperText={
              errors.old_password && touched.old_password && errors.old_password
            }
            label="Old Password"
            className={classes.textField}
          />

          <TextField
            name="new_password1"
            placeholder="Enter your new password"
            type="password"
            value={values.new_password1}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.new_password1 && touched.new_password1}
            helperText={
              errors.new_password1 &&
              touched.new_password1 &&
              errors.new_password1
            }
            label="New Password"
            className={classes.textField}
          />
          <TextField
            name="new_password2"
            placeholder="Repeat your new password"
            type="password"
            value={values.new_password2}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.new_password2 && touched.new_password2}
            helperText={
              errors.new_password2 &&
              touched.new_password2 &&
              errors.new_password2
            }
            label="Repeat your new Password"
            className={classes.textField}
          />
          <br />
          <Button
            raised
            className={classes.button}
            type="button"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            Reset
          </Button>
          <Button
            raised
            className={classes.button}
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </form>
      </span>
    );
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({
    old_password: "",
    new_password1: "",
    new_password2: ""
  }),
  validationSchema: Yup.object().shape({
    old_password: Yup.string()
      .min(6, "This field must be at least 6 characters")
      .required("This field is required"),
    new_password1: Yup.string()
      .min(8, "The password must be at least 8 characters")
      .required("New Password is required"),
    new_password2: Yup.string()
      .oneOf([Yup.ref("new_password1"), null], "Passwords don't match.")
      .required("Password confirm is required")
  }),
  handleSubmit: (
    { old_password, new_password1, new_password2 },
    { props, setSubmitting, setErrors, resetForm }
  ) => {
    console.log("submitting PasswordChangeF");
    props
      .changePassword({ old_password, new_password1, new_password2 })
      .then(response => {
        console.log("CHANGEPW_______", response);
      })
      .then(() => window.scrollTo(0, 0))
      .then(() => resetForm());
    setSubmitting(false);
  },
  displayName: "ChangePasswordForm" //hlps with react devtools
})(InnerPwForm);

export const ChangePassword = withStyles(styles)(EnhancedForm);
