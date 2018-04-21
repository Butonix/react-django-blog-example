import React, { Component } from "react";
import Paper from "material-ui/Paper";

class NewsLetter extends Component {
  render() {
    let { err, isSubscribing, message } = this.props.newsletter;
    return (
      <Paper elevation={5} style={{ boxShadow: "5px 5px 5px lightgray" }}>
        <span>
          {isSubscribing && <div className="loading" />}
          {err && (
            <div className="alert alert-danger" role="alert">
              <strong>{err.message}</strong>
            </div>
          )}
          {message && (
            <div className="alert alert-success" role="alert">
              <strong>{message}</strong>
            </div>
          )}
          <div className="card my-4">
            <label htmlFor="subscription" className="card-header h5">
              Subscribe
            </label>
            <div className="card-body">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.props.subscribe(this.EmailText.value);
                  this.EmailText.value = "";
                }}
              >
                <div className="input-group">
                  <input
                    id="subscription"
                    type="email"
                    className="form-control"
                    placeholder="Enter E-mail..."
                    ref={input => (this.EmailText = input)}
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-secondary"
                      type="submit"
                      style={{ cursor: "pointer" }}
                    >
                      <b>Subscribe</b>
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </span>
      </Paper>
    );
  }
}

export default NewsLetter;
