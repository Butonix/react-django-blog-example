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
    marginBottom: "40px",
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

class MyInnerRegistrationForm extends Component {
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
        <h3 style={{ textAlign: "center" }}>Registration Form</h3>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            placeholder="Enter your Username"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.textField}
            error={errors.username && touched.username}
            helperText={errors.username && touched.username && errors.username}
          />

          <TextField
            name="password1"
            label="Password"
            placeholder="Enter your Password"
            type="password"
            value={values.password1}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.textField}
            error={errors.password1 && touched.password1}
            helperText={
              errors.password1 && touched.password1 && errors.password1
            }
          />
          <TextField
            name="password2"
            label="Repeat your Password"
            placeholder="Repeat your password"
            type="password"
            value={values.password2}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.textField}
            error={errors.password2 && touched.password2}
            helperText={
              errors.password2 && touched.password2 && errors.password2
            }
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
        <span>Already have an account?</span>
        <Link to="/login"> Login</Link>
      </span>
    );
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({
    username: "",
    password1: "",
    password2: ""
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password1: Yup.string()
      .min(8, "The password must be at least 8 characters")
      .required("Password is required"),
    password2: Yup.string()
      .oneOf([Yup.ref("password1"), null], "Passwords don't match.")
      .required("Password confirm is required")
  }),
  handleSubmit: (
    { username, password1, password2 },
    { props, setSubmitting, setErrors }
  ) => {
    console.log("submitting RegistrationF");
    props
      .registerAction({ username, password1, password2 })
      .then(resp => {
        if (
          resp.username ||
          resp.password1 ||
          resp.password2 ||
          resp.non_field_errors
        ) {
          console.log(resp);
          setErrors(resp);
        } else {
          return props.history.push("/");
        }
      })
      .then(() => setSubmitting(false));
  },
  displayName: "RegistrationForm" //hlps with react devtools
})(MyInnerRegistrationForm);

export const RegisterF = withStyles(styles)(EnhancedForm);

RegisterF.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  registerAction: PropTypes.func.isRequired
};
