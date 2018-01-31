import React, { Component } from "react";
import { withFormik } from "formik";
import Yup from "yup";
import { Link } from "react-router-dom";

import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    textAlign: "center"
  },
  textField: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "40px",
    width: "60%"
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
    marginBottom: "3em",
    width: "10%"
  },
  input: {
    display: "none"
  }
});

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      location: "",
      full_name: ""
    };
  }

  componentDidMount() {
    this.props
      .fetchProfileData()
      .then(resp =>
        this.setState({
          bio: resp.userData.bio,
          full_name: resp.userData.full_name,
          location: resp.userData.location
        })
      )
      .then(response => console.log("EDIT RESPONSE______", response));
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <span className={classes.container}>
        <h3 style={{ textAlign: "center" }}>Registration Form</h3>
        <form>
          <TextField
            name="full_name"
            placeholder="Enter your Name"
            type="text"
            value={this.state.full_name}
            onChange={this.handleChange}
            error={false}
            helperText={false}
            label="Name"
            className={classes.textField}
          />
          <TextField
            name="bio"
            multiline={true}
            rows={6}
            value={this.state.bio}
            onChange={this.handleChange}
            error={false}
            helperText={false}
            label="Enter Your Bio/Interests"
            className={classes.textField}
          />
          <TextField
            name="location"
            placeholder="Enter your City/Country"
            type="text"
            value={this.state.location}
            onChange={this.handleChange}
            error={false}
            helperText={false}
            label="Enter your City/Country"
            className={classes.textField}
          />
          <br />
          <input
            accept="image/*"
            className={classes.input}
            id="raised-button-file"
            multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button raised component="span" className={classes.button}>
              Upload An Avatar
            </Button>
          </label>
          <br />
          <Button
            raised
            className={classes.button}
            type="submit"
            disabled={false}
          >
            Submit
          </Button>
        </form>
      </span>
    );
  }
}

export default withStyles(styles)(EditProfile);
