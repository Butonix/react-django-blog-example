import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, Input, Form } from "reactstrap";

class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      userInput: ""
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      userInput: ""
    });
  }

  handleChange() {
    this.setState({
      userInput: this.textInput.value
    });
  }

  render() {
    return (
      <div>
        <Button className="btn btn-secondary btn-sm " onClick={this.toggle}>
          <i className="fa fa-search" aria-hidden="true" />{" "}
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          style={{}}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Search for a Post</ModalHeader>
          <ModalBody>
            <Form>
              <Input
                type="text"
                placeholder="search..."
                onChange={() => this.handleChange()}
                innerRef={input => (this.textInput = input)}
                autoFocus={true}
              />

              <Button className="btn btn-secondary mt-3" onClick={this.toggle}>
                Cancel
              </Button>
              <Link
                to={{
                  pathname: "/posts/",
                  search: `?q=${this.state.userInput}`
                }}
              >
                <Button
                  type="submit"
                  color="primary"
                  className="mt-3 ml-2"
                  onClick={this.toggle}
                >
                  Search
                </Button>{" "}
              </Link>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default SearchModal;
