import React, { Component } from "react";
import { connect } from "react-redux";
import { addCharacter, getCharacters } from "../actions/characterActions";

import PropTypes from "prop-types";

import color from "../imgs/CAT_SHEET.gif";
import "./CharacterScreen.scss";
import { Button, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Player from "../game/Player";

import MessageLog from "./MessageLog";

const StyledPaper = withStyles({
  root: {
    padding: "1rem",
    marginTop: "1rem",
  },
})(Paper);
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
    this.setState({ message: this.state.message + "jacob took 10 dmg\n" });
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
      <div>
        {this.props.isAuthenticated ? (
          <StyledPaper>
            <h3> Cat</h3>
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
          </StyledPaper>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  character: state.character,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, {})(CharacterScreen);
