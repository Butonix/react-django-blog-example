import React, { Component } from "react";
import { withFormik } from "formik";
import Yup from "yup";
import { Link } from "react-router-dom";

import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import { styles } from "./customStylesMui";
import GoogleLoginButton from "../../containers/GoogleAuth/GoogleLoginButtonContainer";

class InnerLoginForm extends Component {
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
        <h3 style={{ textAlign: "center" }}>Google / Website login</h3>
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

          <TextField
            name="password"
            placeholder="Enter your password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password}
            helperText={errors.password && touched.password && errors.password}
            label="Password"
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
        <span>Alternatively login with Google</span>
        <div
          className={classes.links}
          style={{ marginTop: "1em", marginBottom: "2em" }}
        >
          <GoogleLoginButton />
        </div>
        <span>Do not have an account?</span>{" "}
        <Link to="/register" className={classes.links}>
          Register
        </Link>
        <br />
        <span>Forgot your Password?</span>{" "}
        <Link to="/reset" className={classes.links}>
          Reset Password
        </Link>
      </span>
    );
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "The password must be at least 6 characters")
      .required("Password is required")
  }),
  handleSubmit: ({ email, password }, { props, setSubmitting, setErrors }) => {
    props.loginAction({ email, password }).then(response => {
      if (response.non_field_errors) {
        setErrors({ password: response.non_field_errors[0] });
      } else {
        props.authenticateAction(response, props.history, props.dispatch);
      }
    });
    setSubmitting(false);
  },
  displayName: "LoginForm" //hlps with react devtools
})(InnerLoginForm);

export const Login = withStyles(styles)(EnhancedForm);
