import React, { Component } from "react";
import { withFormik } from "formik";
import Yup from "yup";
import { Link } from "react-router-dom";

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
    marginBottom: "3em",
    width: "10%"
  },
  input: {
    display: "none"
  }
});

class InnerEditProfileForm extends Component {
  componentDidMoutn() {}
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
            name="full_name"
            placeholder="Enter your Name"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username && touched.username}
            helperText={errors.username && touched.username && errors.username}
            label="Name"
            className={classes.textField}
          />
          <TextField
            name="bio"
            multiline={true}
            rows={6}
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.message && touched.message}
            helperText={errors.message && touched.message && errors.message}
            label="Enter Your Bio/Interests"
            className={classes.textField}
          />
          <TextField
            name="location"
            placeholder="Enter your City/Country"
            type="text"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username && touched.username}
            helperText={errors.username && touched.username && errors.username}
            label="Enter your City/Country"
            className={classes.textField}
          />
          <br />
          <input
            accept="image/*"
            className={classes.input}
            id="raised-button-file"
            multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button raised component="span" className={classes.button}>
              Upload An Avatar
            </Button>
          </label>
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
    username: "",
    email: "",
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
      .required("Password confirm is required"),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is required")
  }),
  handleSubmit: (
    { username, email, password1, password2 },
    { props, setSubmitting, setErrors }
  ) => {
    console.log("submitting RegistrationF");
    props
      .registerAction({ username, email, password1, password2 })
      .then(resp => {
        if (
          resp.username ||
          resp.password1 ||
          resp.password2 ||
          resp.email ||
          resp.non_field_errors
        ) {
          console.log(resp);
          setErrors(resp);
        } else {
          console.log(resp);
          return props.history.push("/");
        }
      });
    setSubmitting(false);
  },
  displayName: "RegistrationForm" //hlps with react devtools
})(InnerEditProfileForm);

export const EditProfile = withStyles(styles)(EnhancedForm);
