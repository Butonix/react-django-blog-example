import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class VerifyEmail extends Component {
  componentDidMount() {
    this.props.verifyRegistrationEmail(this.props.match.params.key);
  }
  render() {
    const { verify_email } = this.props;
    return (
      <div className="container mt-3">
        {verify_email.message && (
          <div className="alert alert-success" role="alert">
            <strong>{verify_email.message.detail}</strong>
          </div>
        )}
        {verify_email.err && (
          <div className="alert alert-danger" role="alert">
            <strong>{verify_email.err.message}</strong>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(VerifyEmail);
