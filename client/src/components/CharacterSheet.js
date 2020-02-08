import React, { Component, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Toast,
  ToastBody,
  ToastHeader
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { addCharacter, getCharacters } from "../actions/characterActions";
import PropTypes from "prop-types";
import "../App.css";

class CharacterSheet extends Component {
  state = {
    modal: false,
    name: "",
    race: "",
    level: 1,
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10
  };

  static propTypes = {
    addCharacter: PropTypes.func.isRequired,
    character: PropTypes.object.isRequired,
    getCharacters: PropTypes.object.isRequired,
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
      name: this.state.name,
      race: this.state.race,
      level: this.state.level,
      strength: this.state.strength,
      dexterity: this.state.dexterity,
      constitution: this.state.constitution,
      intelligence: this.state.intelligence,
      wisdom: this.state.wisdom,
      charisma: this.state.charisma
    };

    this.props.addCharacter(newCharacter);
  };

  render() {
    const { characters } = this.props.character;
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            colo="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            View/Edit Character
          </Button>
        ) : null}
        <Container>
          <Toast className="character-builder--toast" isOpen={this.state.modal}>
            <Form onSubmit={this.onSubmit}>
              <ToastHeader toggle={this.toggle}>
                {/* <h4>{this.state.name ? this.state.name : "Name"}</h4> */}
              </ToastHeader>
              <ToastBody>
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
                <FormGroup>
                  <Label for="stats">
                    <h6>Stats</h6>
                  </Label>

                  <Row>
                    <Col xs="6" sm="4">
                      <Label for="race">Strength</Label>
                      <Input
                        type="number"
                        name="str"
                        id="str"
                        value={this.state.strength}
                        min={0}
                        max={99}
                        step="1"
                      />
                      <Label for="class">Intelligence</Label>
                      <Input
                        type="number"
                        name="int"
                        id="int"
                        value={this.state.intelligence}
                        min={0}
                        max={99}
                        step="1"
                      />
                    </Col>
                    <Col xs="6" sm="4">
                      <Label for="class">Dexterity</Label>
                      <Input
                        type="number"
                        name="dex"
                        id="dex"
                        value={this.state.dexterity}
                        min={0}
                        max={99}
                        step="1"
                      />
                      <Label for="class">Wisdom</Label>
                      <Input
                        type="number"
                        name="wis"
                        id="wis"
                        value={this.state.wisdom}
                        min={0}
                        max={99}
                        step="1"
                      />
                    </Col>

                    <Col xs="6" sm="4">
                      <Label for="level">Constitution</Label>
                      <Input
                        type="number"
                        name="con"
                        id="con"
                        value={this.state.constitution}
                        min={0}
                        max={99}
                        step="1"
                      />
                      <Label for="level">Charisma</Label>
                      <Input
                        type="number"
                        name="cha"
                        id="cha"
                        value={this.state.charisma}
                        min={0}
                        max={99}
                        step="1"
                      />
                    </Col>
                  </Row>
                  <Button color="dark" style={{ marginTop: "2rem" }} block>
                    Add Character
                  </Button>
                </FormGroup>
              </ToastBody>
            </Form>
          </Toast>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  character: state.character,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});
export default connect(mapStateToProps, {
  getCharacters,
  addCharacter
})(CharacterSheet);
