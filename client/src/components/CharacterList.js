import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getCharacters, deleteCharacter } from "../actions/characterActions";
import PropTypes from "prop-types";

class CharacterList extends Component {
  state = {};

  propTypes = {
    getCharacters: PropTypes.func.isRequired,
    character: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getCharacters();
  }

  onDeleteClick = id => {
    this.props.deleteCharacter(id);
  };
  render() {
    const { characters } = this.props.character;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="character-list">
            {characters.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}

                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  character: state.character,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { getCharacters, deleteCharacter })(
  CharacterList
);
