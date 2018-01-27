import React, { Component } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { renderField } from "../../customFormFields/reduxFormFields";

class Login extends Component {
  submit(
    { username = "", password = "" },
    history = this.props.history,
    dispatch = this.props.dispatch
  ) {
    let error = {};
    let isError = false;

    if (username.trim() === "") {
      error.username = "Required Field";
      isError = true;
    }
    if (password.trim() === "") {
      error.password = "Required Field";
      isError = true;
    }

    if (isError) {
      throw new SubmissionError(error);
    } else {
      return this.props.loginAction({ username, password }).then(data => {
        if (data.username || data.password || data.non_field_errors) {
          throw new SubmissionError({ username: data.non_field_errors });
        } else {
          return this.props.authenticateAction(data, history, dispatch);
        }
      });
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        <h3 className="text-center mt-2 mb-4">You can log in below</h3>
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
            htmlFor="password"
            name="password"
            component={renderField}
            type="password"
            id="password"
            label="Password"
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>{" "}
        </form>
        <span>Do not have an account?</span>{" "}
        <Link to="/register">Register</Link>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loginAction: PropTypes.func.isRequired,
  authenticateAction: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: "loginForm"
})(Login);
