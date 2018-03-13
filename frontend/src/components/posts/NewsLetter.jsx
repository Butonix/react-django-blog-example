import React, { Component } from "react";

class NewsLetter extends Component {
  render() {
    let { err, isSubscribing, message } = this.props.newsletter;
    return (
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
          <h5 className="card-header">Subscribe</h5>
          <div className="card-body">
            <form
              onSubmit={e => {
                e.preventDefault();
                this.props.subscribe(this.EmailText.value);
                this.EmailText.value = "";
              }}
            >
              <div className="input-group">
                <label htmlFor="subscription" />
                <input
                  id="subscription"
                  type="email"
                  className="form-control"
                  placeholder="Enter E-mail..."
                  ref={input => (this.EmailText = input)}
                />
                <span className="input-group-btn">
                  <button className="btn btn-secondary" type="submit">
                    Subscribe
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </span>
    );
  }
}

export default NewsLetter;
