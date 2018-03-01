import React, { Component } from "react";
import ImageCompressor from "image-compressor.js";

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
    marginTop: "10px",
    marginBottom: "1em",
    width: "10%"
  },
  input: {
    display: "none"
  },
  avatar: {
    height: "7em",
    width: "5em"
  }
});

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      location: "",
      full_name: "",
      err: ""
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.props.fetchProfileData().then(resp =>
      this.setState({
        bio: resp.userData.bio,
        full_name: resp.userData.full_name,
        location: resp.userData.location,
        user_image: resp.userData.user_image
      })
    );
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    var data = new FormData();
    data.append("bio", this.state.bio);
    data.append("location", this.state.location);
    data.append("full_name", this.state.full_name);
    if (typeof this.state.user_image === "object") {
      data.append("user_image", this.state.user_image);
    }
    this.props
      .updateProfileData(data)
      .then(resp => {
        if (resp.message) {
          this.setState({ user_image: "" });
          return Promise.reject(resp.message);
        }
      })
      .then(() => {
        this.setState({ err: "" });
        return this.fetchData();
      })
      .then(() => window.scrollTo(0, 0))
      .catch(err => {
        this.setState({ err: err });
        return window.scrollTo(0, 0);
      });
  };

  handleImageChange(e) {
    e.preventDefault();
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    var imageCompress = new ImageCompressor();
    imageCompress.compress(file).then(result => {
      let convertBlobToFile = new File([result], result.name, {
        type: result.type,
        lastModified: result.lastModified
      });
      this.setState({ user_image: convertBlobToFile });
    });
    return;
  }

  render() {
    const { classes } = this.props;
    console.log("STATE IMPORT ", this.state);
    return (
      <span className={classes.container}>
        <span style={{ textAlign: "center", marginTop: "2em" }}>
          <h3>Edit your Profile</h3>
          {this.state.user_image &&
            typeof this.state.user_image !== "object" && (
              <img
                src={this.state.user_image}
                alt="avatar"
                className={classes.avatar}
              />
            )}
          {this.state.err && (
            <div className="alert alert-danger" role="alert">
              <strong>{this.state.err}</strong>
            </div>
          )}
        </span>
        <form>
          <TextField
            name="full_name"
            placeholder="Enter your Name"
            type="text"
            value={this.state.full_name}
            onChange={this.handleChange}
            label="Name"
            className={classes.textField}
          />
          <TextField
            name="bio"
            multiline={true}
            rows={6}
            value={this.state.bio}
            onChange={this.handleChange}
            label="Enter Your Bio/Interests"
            className={classes.textField}
          />
          <TextField
            name="location"
            placeholder="Enter your City/Country"
            type="text"
            value={this.state.location}
            onChange={this.handleChange}
            label="Enter your City/Country"
            className={classes.textField}
          />
          <br />
          <input
            type="file"
            accept="image/*"
            className={classes.input}
            id="raised-button-file"
            onChange={e => this.handleImageChange(e)}
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
            onClick={e => this.handleSubmit(e)}
          >
            Submit
          </Button>
        </form>
      </span>
    );
  }
}

export default withStyles(styles)(EditProfile);
