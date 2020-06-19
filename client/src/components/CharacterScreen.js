import React, { Component, Fragment } from "react";
import {} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { addCharacter, getCharacters } from "../actions/characterActions";
import PropTypes from "prop-types";
import "../App.scss";
import color from "../imgs/CAT_SHEET.gif";
import "./CharacterScreen.scss";

class CharacterScreen extends Component {
  state = {
    name: "",
    level: 1,
    strength: 10,
    dexterity: 10,
    magic: 10,
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

  render() {
    const { characters } = this.props.character;
    return (
      <div>
        {this.props.isAuthenticated ? (
          <div>
            <div className="avatarArrows"></div>
            <div className="avatarContainer">
              <div className="avatar">
                <div className="color">asdfadsf</div>
              </div>
            </div>
            <div className="avatarArrows"></div>
          </div>
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
