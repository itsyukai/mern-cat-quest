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
import Monster from "./Monster.js";

class Bestiary extends Component {
  state = {
    modal: false,
    monsters: [],
    query: ""
  };

  onComponentDidMount() {}
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

  handleCardClose = monster => {
    this.removeMonster(monster);
  };
  handleNotFound = () => {};
  removeMonster = monster => {
    var monsters = [...this.state.monsters];
    var index = monsters.indexOf(monster);
    if (index !== -1) {
      monsters.splice(index, 1);
      this.setState({ monsters: monsters });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const query = async () => {
      const response = await fetch(
        `https://api.open5e.com/monsters/${this.state.query}`
      );
      const jsonMonster = await response.json(); //extract JSON from the http response
      if (jsonMonster.detail === "Not found.") {
        this.handleNotFound();
      } else {
        this.setState(prevState => ({
          monsters: [...prevState.monsters, jsonMonster]
        }));
      }
    };
    query();
  };

  renderMonsterCards = () => {
    const { monsters } = this.state;
    if (monsters.length > 0) {
      const cards = monsters.map(mon => (
        <Monster
          key={mon.name}
          monster={mon}
          onClose={() => this.handleCardClose(mon)}
        />
      ));
      return <div>{cards}</div>;
    } else {
      return null;
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
        </Toast>
        {this.renderMonsterCards()}
      </Container>
    );
  } // render
} // class

const mapStateToProps = state => ({
  character: state.character,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});
export default Bestiary;
