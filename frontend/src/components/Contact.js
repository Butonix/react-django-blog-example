import React, { Component } from "react";
import { Field, reduxForm, SubmissionError, reset } from "redux-form";
import {
  renderField,
  renderTextArea
} from "../customFormFields/reduxFormFields";
import PropTypes from "prop-types";

import Recaptcha from "react-recaptcha";

class Contact extends Component {
  constructor() {
    super();
    this.verifyCallback = this.verifyCallback.bind(this);
  }
  verifyCallback(response) {
    console.log(response);
  }
  submit({
    first_name = "",
    last_name = "",
    email = "",
    website = "",
    message = "",
    captcha = ""
  }) {
    let error = {};
    let isError = false;
    let { submitContactForm, contact_form, dispatch } = this.props;
    if (first_name.trim() === "") {
      error.first_name = "Required Field";
      isError = true;
    }
    if (last_name.trim() === "") {
      error.last_name = "Required Field";
      isError = true;
    }
    if (email.trim() === "") {
      error.email = "Required Field";
      isError = true;
    }
    if (message.trim() === "") {
      error.message = "Required Field";
      isError = true;
    }

    if (isError) {
      throw new SubmissionError(error);
    } else {
      submitContactForm({
        first_name,
        last_name,
        email,
        website,
        message,
        captcha: contact_form.captcha
      })
        .then(() => dispatch(reset("contactForm")))
        .then(() => this.recaptchaInstance.reset())
        .then(() => window.scrollTo(0, 0));
    }
  }

  render() {
    let { contact_form, handleSubmit } = this.props;
    function onloadCallback() {
      return null;
    }

    return (
      <div className="container">
        <h3 className="text-center mt-2 mb-4">
          Contact Me by filling the form
        </h3>
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
        <form onSubmit={handleSubmit(values => this.submit(values))}>
          <Field
            htmlFor="first_name"
            name="first_name"
            component={renderField}
            type="text"
            id="first_name"
            label="First Name"
            autoF="autofocus"
          />

          <Field
            htmlFor="last_name"
            name="last_name"
            component={renderField}
            type="text"
            id="last_name"
            label="Last Name"
          />

          <Field
            htmlFor="email"
            name="email"
            component={renderField}
            type="email"
            id="email"
            label="Email"
          />

          <Field
            htmlFor="website"
            name="website"
            component={renderField}
            type="url"
            id="website"
            label="Website"
          />
          <Field
            htmlFor="message"
            name="message"
            component={renderTextArea}
            id="message"
            label="Message"
          />
          <Recaptcha
            sitekey="6Le7xT4UAAAAAOuGdLd4TcqpXDRDZMIxvTn0CEYB"
            render="explicit"
            theme="dark"
            onloadCallback={onloadCallback}
            verifyCallback={this.verifyCallback}
            ref={e => (this.recaptchaInstance = e)}
          />

          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>
    );
  }
}

Contact.propTypes = {
  submitContactForm: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  contact_form: PropTypes.shape({
    err: PropTypes.objectOf(PropTypes.string),
    isSubmitting: PropTypes.bool.isRequired,
    message: PropTypes.string
  }).isRequired
};

export default reduxForm({
  form: "contactForm"
})(Contact);
