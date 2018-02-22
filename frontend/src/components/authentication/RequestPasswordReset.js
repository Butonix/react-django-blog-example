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
      classes,
      request_password_reset
    } = this.props;

    return (
      <span className={classes.container}>
        {request_password_reset.message && (
          <div className="alert alert-success" role="alert">
            <strong>{request_password_reset.message.detail}</strong>
          </div>
        )}
        {request_password_reset.err && (
          <div className="alert alert-danger" role="alert">
            <strong>{request_password_reset.err.message}</strong>
          </div>
        )}
        <h3 style={{ textAlign: "center" }} className="mt-3 mb-4">
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
          <br />
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
    email: ""
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is required")
  }),
  handleSubmit: ({ email }, { props, setSubmitting, setErrors, resetForm }) => {
    props.requestPasswordReset(email).then(() => resetForm());
    setSubmitting(false);
  },
  displayName: "ResetForm" //hlps with react devtools
})(InnerResetPasswordForm);

export const RequestPasswordReset = withStyles(styles)(EnhancedForm);
