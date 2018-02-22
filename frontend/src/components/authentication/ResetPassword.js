import React, { Component } from "react";
import { withFormik } from "formik";
import Yup from "yup";
import { Link } from "react-router-dom";

import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import { styles } from "./customStylesMui";

class InnerResetPasswordForm extends Component {
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
        <h3 style={{ textAlign: "center" }}>
          Reset your password by entering your Email address
        </h3>
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            placeholder="Enter your Email"
            type="text"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email}
            helperText={errors.email && touched.email && errors.email}
            label="Email Address"
            className={classes.textField}
          />
          <Button
            raised
            className={classes.button}
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </form>
        <span>Do not have an account?</span>{" "}
        <Link to="/register">Register</Link>
        <hr />
        <span>Forgot your Password?</span>{" "}
        <Link to="/reset">Reset Password</Link>
      </span>
    );
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({
    email: ""
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is required")
  }),
  // handleSubmit: ({ email, password }, { props, setSubmitting, setErrors }) => {
  //   props.loginAction({ email, password }).then(response => {
  //     if (response.non_field_errors) {
  //       setErrors({ password: response.non_field_errors[0] });
  //     } else {
  //       props.authenticateAction(response, props.history, props.dispatch);
  //     }
  //   });
  //   setSubmitting(false);
  // },
  displayName: "ResetForm" //hlps with react devtools
})(InnerResetPasswordForm);

export const ResetPassword = withStyles(styles)(EnhancedForm);
