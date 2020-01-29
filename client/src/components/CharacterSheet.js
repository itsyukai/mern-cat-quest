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
  FormText,
  Toast,
  ToastBody,
  ToastHeader,
  CustomInput
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { addCharacter } from "../actions/characterActions";
import PropTypes from "prop-types";
import "../App.css";

class CharacterSheet extends Component {
  state = {
    modal: false,
    c_name: "",
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
    // handleClick: PropTypes.func.isRequired,
    addCharacter: PropTypes.func.isRequired,
    character: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
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
    var target = "c_" + e.target.name;
    this.setState({
      [target]: e.target.value
    });
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
            View Characters
          </Button>
        ) : null}
        <Container>
          <Toast className="character-builder--toast" isOpen={this.state.modal}>
            <Form>
              <ToastHeader toggle={this.toggle}>
                <FormGroup inline>
                  <div>
                    Name:
                    <CustomInput
                      type="text"
                      name="name"
                      id="characterName"
                      value={this.state.name}
                      onChange={this.onChange}
                      placeholder="Name"
                    />
                  </div>
                </FormGroup>
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
                    <h4>Stats</h4>
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
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { addCharacter })(CharacterSheet);
