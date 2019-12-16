import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Toast,
  ToastBody,
  ToastHeader
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { addCharacter } from "../actions/characterActions";
import PropTypes from "prop-types";
import "../App.css";

class CharacterBuilder extends Component {
  state = {
    name = "",
    race = "",
    level = 1,
    strength = 10,
    dexterity = 10,
    constitution = 10,
    intelligence = 10,
    wisdom = 10,
    charisma = 10,
  };

  propTypes = {
    handleClick: PropTypes.func.isRequired,
    addCharacter: PropTypes.func.isRequired,
    character: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  render() {
    const { characters } = this.props.character;
    return (
      <Container>
        <Toast className="character-builder--toast">
          <ToastHeader toggle={this.props.handleClick}>
            Character Builder
          </ToastHeader>
          <ToastBody>
            <Form>
              <FormGroup>
                <Row>
                  <Container>
                    <Label for="characterName">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="characterName"
                      value={this.state.name}
                      placeholder="Name"
                    />
                  </Container>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs="6" sm="4">
                    <Label for="race">Race</Label>
                    <Input
                      type="text"
                      name="race"
                      id="race"
                      value={this.state.race}

                      placeholder="Race"
                    />
                  </Col>
                  <Col xs="6" sm="4">
                    <Label for="class">Class</Label>
                    <Input
                      type="text"
                      name="class"
                      id="class"
                      value={this.state.class}

                      placeholder="Class"
                    />
                  </Col>

                  <Col xs="6" sm="4">
                    <Label for="level">Level</Label>
                    <Input
                      type="number"
                      name="level"
                      id="level"
                      placeholder="Level"
                      min={0}
                      max={99}
                      step="1"
                    />
                  </Col>
                </Row>
              </FormGroup>
              <Row>
                <Container>
                  <FormGroup id="stats" className="display-flex">
                    <Col>
                      <Row xs="6">
                        <Label for="strength">STRENGTH</Label>
                        <Input
                          type="number"
                          name="strength"
                          id="strength"
                          placeholder="10"
                          min={0}
                          max={99}
                          step="1"
                        />
                      </Row>
                      <Row xs="6">
                        <Label for="dexterity">DEXTERITY</Label>
                        <Input
                          type="number"
                          name="dexterity"
                          id="dexterity"
                          placeholder="10"
                          min={0}
                          max={99}
                          step="1"
                        />
                      </Row>
                      <Row xs="6">
                        <Label for="constitution">CONSTITUTION</Label>
                        <Input
                          type="number"
                          name="constitution"
                          id="constitution"
                          placeholder="10"
                          min={0}
                          max={99}
                          step="1"
                        />
                      </Row>
                      <Row xs="6">
                        <Label for="intelligence">INTELLIGENCE</Label>
                        <Input
                          type="number"
                          name="intelligence"
                          id="intelligence"
                          placeholder="10"
                          min={0}
                          max={99}
                          step="1"
                        />
                      </Row>
                      <Row xs="6">
                        <Label for="wisdom">WISDOM</Label>
                        <Input
                          type="number"
                          name="wisdom"
                          id="wisdom"
                          placeholder="10"
                          min={0}
                          max={99}
                          step="1"
                        />
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <Label for="charisma">CHARISMA</Label>
                        <Input
                          type="number"
                          name="charisma"
                          id="charisma"
                          placeholder="10"
                          min={0}
                          max={99}
                          step="1"
                        />
                      </Row>
                    </Col>
                  </FormGroup>
                </Container>
              </Row>
            </Form>
          </ToastBody>
        </Toast>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  character: state.character,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { addCharacter })(CharacterBuilder);
