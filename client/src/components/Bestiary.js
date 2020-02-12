import React, { Component, Fragment } from "react";
import {
  Container,
  Button,
  Form,
  Input,
  Toast,
  ToastBody,
  ToastHeader
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../App.css";

class Bestiary extends Component {
  state = {
    modal: false,
    monster: null,
    loading: false,
    query: ""
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

    this.setState({ loading: true });

    const query = async () => {
      const response = await fetch(
        `https://api.open5e.com/monsters/${this.state.query}`
      );
      const myJson = await response.json(); //extract JSON from the http response
      this.setState({
        loading: false,
        monster: myJson
      });
    };
    query();
  };

  renderMonsterInformation = () => {
    const { monster } = this.state;
    if (this.state.loading) {
      return <Container> Loading . . .</Container>;
    } else {
      if (this.state.monster) {
        return (
          <Container>
            = Monster Name: ${monster.name} <br />
            [Size] {monster.size}
            <br />
            [Type] {monster.type}
            <br />
            [Subtype] {monster.subtype}
            <br />
            [Alignment] {monster.alignment}
            <br />
            [Armor Class] {monster.armor_class}
            <br />
            [Armor Description]{monster.armor_desc}
            <br />
            [Hit Points]{monster.hit_points}
            <br />
            [Hit Dice]{monster.hit_dice}
            <br />= Ability Scores / Saves = \ [Strength] {
              monster.strength
            } / {monster.strength_save}
            <br />
            [Dexterity] {monster.dexterity} / {monster.dexterity_save}
            <br />
            [Constitution] {monster.constitution} / {monster.constitution_save}
            <br />
            [Wisdom] {monster.wisdom} / {monster.wisdom_save}
            <br />
            [Charisma] {monster.dexterity} / {monster.dexterity_save}
            <br />
            [Dexterity] {monster.dexterity} / {monster.dexterity_save}
          </Container>
        );
      } else {
        return null;
      }
    }
  };

  render() {
    return (
      <Container>
        <Button
          colo="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Bestiary
        </Button>
        <Toast className="character-builder--toast" isOpen={this.state.modal}>
          <Form onSubmit={this.onSubmit}>
            <ToastHeader toggle={this.toggle}>Bestiary</ToastHeader>
            <ToastBody>
              <Input
                type="text"
                placeholder="Search"
                name="query"
                onChange={this.onChange}
                value={this.state.query}
              />
            </ToastBody>
          </Form>
          {this.renderMonsterInformation()}
        </Toast>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  character: state.character,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});
export default Bestiary;
