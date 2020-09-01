import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addCharacter, getCharacters } from "../actions/characterActions";
import PropTypes from "prop-types";
import "./CharacterScreen.scss";
import Button from "@material-ui/core/Button";
import Player from "../game/Player";
import MessageLog from "./MessageLog";

class CharacterScreen extends Component {
  state = {
    player: null,
    message: "",
  };

  static propTypes = {
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newCharacter = {
      owner: this.props.user._id,
      name: this.state.name,
      level: this.state.level,
      strength: this.state.strength,
      dexterity: this.state.dexterity,
      magic: this.state.magic,
    };
  };

  onAttack = () => {
    this.state.player.damage(10);
    this.setState({
      message: this.state.message + this.state.player.health + "\n",
    });
  };
  componentDidMount() {
    const newPlayer = new Player("jacob");
    this.setState({ player: newPlayer }, () => {
      console.log(this.state.player.name);
    });
  }
  render() {
    const { characters } = this.props.character;
    return (
      <Fragment>
        {this.props.isAuthenticated ? (
          <div className="CharacterScreen">
            <h3> Cat</h3>
            <h2>Under Construction</h2>
            <div className="avatarContainer">
              <div className="avatarArrowsContainer">
                <div className="avatarLeftArrow" />
                <div className="avatarLeftArrow" />
                <div className="avatarLeftArrow" />
              </div>
              <div className="avatarContainer">
                <div className="avatar">
                  <div className="color"></div>
                </div>
              </div>
              <div className="avatarArrowsContainer">
                <div className="avatarRightArrow" />
                <div className="avatarRightArrow" />
                <div className="avatarRightArrow" />
              </div>
            </div>
            <Button onClick={this.onAttack}> Hit Jason</Button>
            <br></br>

            <MessageLog message={this.state.message} />
          </div>
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  character: state.character,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, {})(CharacterScreen);
