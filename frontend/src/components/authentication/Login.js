import React, { Component } from "react";
import { withFormik } from "formik";
import Yup from "yup";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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
    width: "10%"
  }
});

class MyInnerLoginForm extends Component {
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
        <h3 style={{ textAlign: "center" }}>Login Form</h3>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            placeholder="Enter your username"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.textField}
            error={errors.username && touched.username}
            helperText={errors.username && touched.username && errors.username}
          />

          <TextField
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.textField}
            error={errors.password && touched.password}
            helperText={errors.password && touched.password && errors.password}
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
        <span>Do not have an account?</span>{" "}
        <Link to="/register">Register</Link>
      </span>
    );
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({
    username: "",
    password: ""
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "The password must be at least 6 characters")
      .required("Password is required")
  }),
  handleSubmit: (
    { username, password },
    { props, setSubmitting, setErrors }
  ) => {
    console.log("submitting LoginF");
    props
      .loginAction({ username, password })
      .then(response => {
        if (response.non_field_errors) {
          setErrors({ password: response.non_field_errors[0] });
        } else {
          props.authenticateAction(response, props.history, props.dispatch);
        }
      })
      .then(() => setSubmitting(false));
  },
  displayName: "LoginForm" //hlps with react devtools
})(MyInnerLoginForm);

export const Login = withStyles(styles)(EnhancedForm);

Login.propTypes = {
  history: PropTypes.object.isRequired,
  loginAction: PropTypes.func.isRequired,
  authenticateAction: PropTypes.func.isRequired
};
