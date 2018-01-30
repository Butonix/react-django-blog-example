import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import GoogleLoginButton from "../../containers/GoogleAuth/GoogleLoginButtonContainer";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  textField: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "85%"
  },
  button: {
    margin: "auto"
  }
});

class Form extends PureComponent {
  state = {
    text: "",
    textError: ""
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.createCommentReply) {
      this.textInput.focus();
    }
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  validate() {
    let isError = false;
    const error = {};

    if (this.state.text.trim() === "") {
      isError = true;
      error.textError = "The field is required.";
    }
    this.setState({
      ...this.state,
      ...error
    });
    return isError;
  }

  submit(e) {
    e.preventDefault();
    let err = this.validate();
    if (!err) {
      console.log("POSTING to server");
      if (!this.props.createCommentReply) {
        this.props
          .createCommentForPost(this.props.postId, this.state.text)
          .then(resp => {
            if (resp.err) {
              return Promise.reject();
            }
          })
          .then(() => this.props.fetchCommentsForPost(this.props.postId))
          .catch(() => {
            return;
          });
      }
      if (this.props.toggleTextForm) {
        this.props
          .createCommentReply(
            this.props.postId,
            this.props.commentId,
            this.state.text
          )
          .then(resp => {
            if (resp.err) {
              this.props.toggleTextForm();
              return Promise.reject();
            }
          })
          .then(() => this.props.toggleTextForm())
          .then(() => this.props.fetchCommentsForPost(this.props.postId))
          .catch(() => {
            return;
          });
      }
      if (this.props.toggleTextFormReply) {
        this.props
          .createCommentReply(
            this.props.postId,
            this.props.commentId,
            this.state.text
          )
          .then(() => this.props.toggleTextFormReply())
          .then(() => this.props.fetchCommentsForPost(this.props.postId));
      }
      //now clear form.
      this.setState({
        text: "",
        textError: ""
      });
    } else {
      console.log("There is an error in your form.");
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container}>
        <TextField
          id="text"
          name="text"
          inputRef={input => (this.textInput = input)}
          label="Comment Text"
          className={classes.textField}
          value={this.state.text}
          onChange={e => this.change(e)}
          margin="normal"
          error={!!this.state.textError}
          helperText={this.state.textError}
        />
        {this.props.isAuthenticatedGoogle || this.props.isAuthenticatedEmail ? (
          <Button
            raised
            className={classes.button}
            onClick={e => this.submit(e)}
            type="submit"
            disabled={!!this.state.text ? false : true}
          >
            Post
          </Button>
        ) : (
          <GoogleLoginButton />
        )}
      </form>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Form);
