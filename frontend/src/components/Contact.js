import React, { Component } from "react";
import { withFormik } from "formik";
import Yup from "yup";
import PropTypes from "prop-types";
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
    marginBottom: "2em",
    width: "60%"
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "10%"
  }
});

class ContactForm extends Component {
  onloadCallback = () => null;
  handleSubmitAndCaptcha(
    event,
    { first_name, last_name, email, website, message } = this.props.values
  ) {
    event.preventDefault();
    console.log("submitting");
    this.props
      .submitContactForm({ first_name, last_name, email, website, message })
      .then(response => console.log("RESPONSE-", response))
      .then(() => this.props.resetForm())
      .then(() => this.props.setSubmitting(false))
      .then(() => window.scrollTo(0, 0))
      .then(() => this.recaptchaInstance.reset());
  }
  render() {
    const {
      values,
      touched,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      handleBlur,
      handleReset,
      classes,
      contact_form
    } = this.props;

    return (
      <span className={classes.container}>
        <h3 style={{ textAlign: "center" }}>Contact Form</h3>
        {this.props.contact_form.err ? (
          <div className="alert alert-danger" role="alert">
            <strong>{contact_form.err.message}</strong>
          </div>
        ) : null}
        {this.props.contact_form.message ? (
          <div className="alert alert-success" role="alert">
            <strong>{contact_form.message}</strong>
          </div>
        ) : null}
        <form onSubmit={e => this.handleSubmitAndCaptcha(e)}>
          <TextField
            name="first_name"
            placeholder="Enter your First Name"
            type="text"
            value={values.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.first_name && touched.first_name}
            helperText={
              errors.first_name && touched.first_name && errors.first_name
            }
            label="First Name"
            className={classes.textField}
            required
          />

          <TextField
            name="last_name"
            placeholder="Enter your Last Name"
            type="text"
            value={values.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.last_name && touched.last_name}
            helperText={
              errors.last_name && touched.last_name && errors.last_name
            }
            label="Last Name"
            className={classes.textField}
            required
          />
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
            required
          />
          <TextField
            name="website"
            placeholder="Enter your Website"
            type="url"
            value={values.website}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.website && touched.website}
            helperText={errors.website && touched.website && errors.website}
            label="Your Website"
            className={classes.textField}
          />

          <TextField
            name="message"
            multiline={true}
            rows={6}
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.message && touched.message}
            helperText={errors.message && touched.message && errors.message}
            label="Your Message"
            className={classes.textField}
            required
          />
          <span
            style={{
              margin: "0 auto",
              marginTop: "1em",
              marginBottom: "1em",
              textAlign: "center",
              display: "block",
              width: "304px"
            }}
          >
            <Recaptcha
              sitekey="6Le7xT4UAAAAAOuGdLd4TcqpXDRDZMIxvTn0CEYB"
              render="explicit"
              theme="dark"
              onloadCallback={this.onloadCallback}
              verifyCallback={this.verifyCallback}
              ref={e => (this.recaptchaInstance = e)}
            />
          </span>
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
  displayName: "ContactForm" //hlps with react devtools
})(ContactForm);

export const Contact = withStyles(styles)(EnhancedForm);

Contact.propTypes = {
  submitContactForm: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  contact_form: PropTypes.shape({
    err: PropTypes.objectOf(PropTypes.string),
    isSubmitting: PropTypes.bool.isRequired,
    message: PropTypes.string
  }).isRequired
};
