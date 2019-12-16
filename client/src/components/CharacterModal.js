import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCharacter } from "../actions/characterActions";

class CharacterModal extends Component {
  state = {
    modal: false,
    name: ""
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const newCharacter = {
      owner: this.props.user._id,
      name: this.state.name
    };

    // add character via addCharacter action
    this.props.addCharacter(newCharacter);

    // close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            colo="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Use Character Modal
          </Button>
        ) : (
          <h4 className="mb-3 ml-4"> Please log in to manage characters</h4>
        )}

        <Modal isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggle}>Add to Character List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="character"> Character </Label>
                <Input
                  type="text"
                  name="name"
                  id="character"
                  placeholder="Add character"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Character
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  character: state.character,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});
export default connect(mapStateToProps, { addCharacter })(CharacterModal);
