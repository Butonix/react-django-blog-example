import React, { Component } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { renderField } from "../../customFormFields/reduxFormFields";

class Register extends Component {
  submit(
    { username = "", password1 = "", password2 = "" },
    history = this.props.history
  ) {
    let error = {};
    let isError = false;

    if (username.trim() === "") {
      error.username = "Required field";
      isError = true;
    }

    if (password1 !== password2) {
      error.password1 = "The Passwords do not match";
      isError = true;
    }

    if (password1.length < 8) {
      error.password1 =
        "The password is too short. It must contain at least 8 characters.";
      isError = true;
    }

    if (password2.length < 8) {
      error.password2 =
        "The password is too short. It must contain at least 8 characters.";
      isError = true;
    }

    if (isError) {
      throw new SubmissionError(error);
    } else {
      return this.props
        .registerAction({ username, password1, password2 })
        .then(data => {
          if (
            data.username ||
            data.password1 ||
            data.password2 ||
            data.non_field_errors
          ) {
            throw new SubmissionError(data);
          } else {
            return this.props.history.push("/");
          }
        });
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <h3 className="text-center mt-2 mb-4">You can register below</h3>
        <form onSubmit={handleSubmit(values => this.submit(values))}>
          <Field
            htmlFor="username"
            name="username"
            component={renderField}
            type="text"
            id="username"
            label="Username"
            autoF="autofocus"
          />
          <Field
            htmlFor="password1"
            name="password1"
            component={renderField}
            type="password"
            id="password1"
            label="Password"
          />
          <Field
            htmlFor="password2"
            name="password2"
            component={renderField}
            type="password"
            id="password2"
            label="Password Confirmation"
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>{" "}
        </form>
        <span>already have an account?</span>
        <Link to="/login"> Login</Link>
      </div>
    );
  }
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  registerAction: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: "registerForm"
})(Register);
