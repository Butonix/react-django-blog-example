import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import { styles } from "./customStylesMui";

class EditForm extends PureComponent {
  state = {
    text: "",
    textError: ""
  };

  componentDidMount() {
    this.setState({ text: this.props.prevText });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.toggleEditForm || this.props.toggleEditFormReply) {
      this.textInput.focus();
    }
    if (prevProps.prevText !== this.props.prevText) {
      this.setState({ text: this.props.prevText });
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
      if (!this.props.editCommentReply) {
        this.props
          .editCommentForPost(
            this.props.postId,
            this.props.commentId,
            this.state.text
          )
          .then(() => this.props.toggleEditForm())
          .then(() => this.props.fetchCommentsForPost(this.props.postId));
      } else {
        this.props
          .editCommentReply(
            this.props.postId,
            this.props.commentId,
            this.props.commentReplyId,
            this.state.text
          )
          .then(() => this.props.toggleEditFormReply())
          .then(() => this.props.fetchCommentsForPost(this.props.postId));
      }

      this.setState({
        text: "",
        textError: ""
      });
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
          multiline={true}
          rows={4}
        />

        <Button
          raised
          className={classes.button}
          onClick={e => this.submit(e)}
          type="submit"
          disabled={!!this.state.text ? false : true}
        >
          Post
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(EditForm);
