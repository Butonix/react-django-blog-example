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
    const { toggleEditForm, toggleEditFormReply, prevText } = this.props;
    if (toggleEditForm || toggleEditFormReply) {
      this.textInput.focus();
    }
    if (prevProps.prevText !== prevText) {
      this.setState({ text: prevText });
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
      editCommentReply,
      editCommentForPost,
      postId,
      commentId,
      toggleEditForm,
      fetchCommentsForPost,
      commentReplyId,
      toggleEditFormReply
    } = this.props;
    e.preventDefault();
    let err = this.validate();
    if (!err) {
      if (!editCommentReply) {
        editCommentForPost(postId, commentId, this.state.text)
          .then(() => toggleEditForm())
          .then(() => fetchCommentsForPost(postId));
      } else {
        editCommentReply(postId, commentId, commentReplyId, this.state.text)
          .then(() => toggleEditFormReply())
          .then(() => fetchCommentsForPost(postId));
      }

      this.setState({
        text: "",
        textError: ""
      });
    }
  }

  render() {
    const { classes } = this.props;
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

        <Button
          raised
          className={classes.button}
          onClick={e => this.submit(e)}
          type="submit"
          disabled={!!text ? false : true}
        >
          Post
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(EditForm);
