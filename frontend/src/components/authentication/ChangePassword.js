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
        <form onSubmit={handleSubmit}>
          <TextField
            name="old_password"
            placeholder="Enter your Old password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password}
            helperText={errors.password && touched.password && errors.password}
            label="Old Password"
            className={classes.textField}
          />

          <TextField
            name="new_password1"
            placeholder="Enter your new password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password}
            helperText={errors.password && touched.password && errors.password}
            label="New Password"
            className={classes.textField}
          />
          <TextField
            name="new_password2"
            placeholder="Repeat your new password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password}
            helperText={errors.password && touched.password && errors.password}
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
    new_password1: Yup.string()
      .min(8, "The password must be at least 8 characters")
      .required("Password is required"),
    new_password2: Yup.string()
      .oneOf([Yup.ref("new_password1"), null], "Passwords don't match.")
      .required("Password confirm is required")
  }),
  handleSubmit: (
    { old_password, new_password1, new_password2 },
    { props, setSubmitting, setErrors }
  ) => {
    console.log("submitting LoginF");
    props
      .changePassword({ old_password, new_password1, new_password2 })
      .then(response => {
        if (response.non_field_errors) {
          console.log(response);
          setErrors({ password: response.non_field_errors[0] });
        } else {
          console.log(response);
          props.authenticateAction(response, props.history, props.dispatch);
        }
      });
    setSubmitting(false);
  },
  displayName: "ChangePasswordForm" //hlps with react devtools
})(InnerPwForm);

export const ChangePassword = withStyles(styles)(EnhancedForm);
