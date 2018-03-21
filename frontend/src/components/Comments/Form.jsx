import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import GoogleLoginButton from "../../containers/GoogleAuth/GoogleLoginButtonContainer";

import { styles } from "./customStylesMui";

class Form extends PureComponent {
  state = {
    text: "",
    textError: "",
    showGoogLogin: false
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
    const {
      postId,
      commentId,
      fetchCommentsForPost,
      toggleTextForm,
      toggleTextFormReply,
      createCommentReply,
      createCommentForPost
    } = this.props;
    e.preventDefault();
    let err = this.validate();
    if (!err) {
      if (!createCommentReply) {
        createCommentForPost(postId, this.state.text)
          .then(resp => {
            if (resp.err) {
              return Promise.reject();
            }
          })
          .then(() => fetchCommentsForPost(postId))
          .catch(() => {
            return;
          });
      }
      if (toggleTextForm) {
        this.props
          .createCommentReply(postId, commentId, this.state.text)
          .then(resp => {
            if (resp.err) {
              toggleTextForm();
              return Promise.reject();
            }
          })
          .then(() => toggleTextForm())
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
          .then(() => toggleTextFormReply())
          .then(() => fetchCommentsForPost(postId));
      }
      //now clear form.
      this.setState({
        text: "",
        textError: ""
      });
    }
  }

  render() {
    const { classes, isAuthenticatedEmail, isAuthenticatedGoogle } = this.props;
    const { text, textError } = this.state;
    return (
      <form className={classes.container}>
        <TextField
          id="text"
          name="text"
          inputRef={input => (this.textInput = input)}
          label="Comment Text"
          className={classes.textField}
          value={text}
          onChange={e => this.change(e)}
          margin="normal"
          error={!!textError}
          helperText={textError}
          multiline={true}
          rows={4}
        />
        {(isAuthenticatedGoogle || isAuthenticatedEmail) && (
          <Button
            raised
            className={classes.button}
            onClick={e => this.submit(e)}
            type="submit"
            disabled={!!text ? false : true}
          >
            Post
          </Button>
        )}
        {!this.props.createCommentReply &&
          (!isAuthenticatedGoogle && !isAuthenticatedEmail) && (
            <div className={classes.links}>
              <GoogleLoginButton className={classes.links} />
            </div>
          )}
      </form>
    );
  }
}

export default withStyles(styles)(Form);
