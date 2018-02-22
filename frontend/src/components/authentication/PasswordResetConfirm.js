import React, { Component } from "react";
import { withFormik } from "formik";
import Yup from "yup";

import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import { styles } from "./customStylesMui";

class InnerPasswordResetConfirm extends Component {
  render() {
    const {
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      classes,
      password_reset_confirm
    } = this.props;
    return (
      <span className={classes.container}>
        {password_reset_confirm.message.detail && (
          <div className="alert alert-info mt-2" role="alert">
            <strong>{password_reset_confirm.message.detail}</strong>
          </div>
        )}
        {password_reset_confirm.err && (
          <div className="alert alert-danger mt-2" role="alert">
            <strong>{password_reset_confirm.err.message}</strong>
          </div>
        )}
        <h3 style={{ textAlign: "center" }}>Reset your Password below</h3>
        <form onSubmit={handleSubmit}>
          <TextField
            name="password1"
            placeholder="Enter your Password"
            type="password"
            value={values.password1}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password1 && touched.password1}
            helperText={
              errors.password1 && touched.password1 && errors.password1
            }
            className={classes.textField}
            label="Password"
            required
          />
          <TextField
            name="password2"
            placeholder="Repeat your password"
            type="password"
            value={values.password2}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password2 && touched.password2}
            helperText={
              errors.password2 && touched.password2 && errors.password2
            }
            className={classes.textField}
            label="Repeat your Password"
            required
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
    password1: "",
    password2: ""
  }),
  validationSchema: Yup.object().shape({
    password1: Yup.string()
      .min(8, "The password must be at least 8 characters")
      .required("Password is required"),
    password2: Yup.string()
      .oneOf([Yup.ref("password1"), null], "Passwords don't match.")
      .required("Password confirm is required")
  }),
  handleSubmit: (
    { password1, password2 },
    { props, setSubmitting, setErrors }
  ) => {
    props
      .passwordResetConfirm(
        password1,
        password2,
        props.match.params.uid,
        props.match.params.token
      )
      .then(resp => {
        if (resp.password1 || resp.password2 || resp.non_field_errors) {
          setErrors(resp);
        } else {
          return;
        }
      });
    setSubmitting(false);
  },
  displayName: "PasswordResetConfirm" //hlps with react devtools
})(InnerPasswordResetConfirm);

export const PasswordResetConfirm = withStyles(styles)(EnhancedForm);
