import React, { Component } from "react";
import { withFormik } from "formik";
import Yup from "yup";
import Recaptcha from "react-recaptcha";

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
    width: "60%"
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
    width: "10%"
  }
});

class ContactForm extends Component {
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
        <h3 style={{ textAlign: "center" }}>Contact Form</h3>

        <form onSubmit={handleSubmit}>
          <TextField
            name="first_name"
            label="First Name"
            placeholder="Enter your First Name"
            type="text"
            value={values.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.textField}
            error={errors.first_name && touched.first_name}
            helperText={
              errors.first_name && touched.first_name && errors.first_name
            }
          />

          <TextField
            name="last_name"
            label="Last Name"
            placeholder="Enter your Last Name"
            type="text"
            value={values.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.textField}
            error={errors.last_name && touched.last_name}
            helperText={
              errors.last_name && touched.last_name && errors.last_name
            }
          />
          <TextField
            name="email"
            label="Email Address"
            placeholder="Enter your Email"
            type="text"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.textField}
            error={errors.email && touched.email}
            helperText={errors.email && touched.email && errors.email}
          />
          <TextField
            name="website"
            label="Your Website"
            placeholder="Enter your Website"
            type="url"
            value={values.website}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.textField}
            error={errors.website && touched.website}
            helperText={errors.website && touched.website && errors.website}
          />

          <TextField
            name="message"
            multiline={true}
            rows={10}
            label="Your Message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classes.textField}
            error={errors.message && touched.message}
            helperText={errors.message && touched.message && errors.message}
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
    first_name: "",
    last_name: "",
    email: "",
    website: "",
    message: ""
  }),
  validationSchema: Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is required"),
    website: Yup.string().url("Invalid Url"),
    message: Yup.string().required("Message is a required field")
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("submitting", values);
    setSubmitting(false);
  },
  displayName: "ContactForm" //hlps with react devtools
})(ContactForm);

const ContactFormik = withStyles(styles)(EnhancedForm);
