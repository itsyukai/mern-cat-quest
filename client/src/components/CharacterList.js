import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getCharacters, deleteCharacter } from "../actions/characterActions";
import PropTypes from "prop-types";

class CharacterList extends Component {
  state = {};

  static propTypes = {
    getCharacters: PropTypes.func.isRequired,
    character: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
      if (this.props.isAuthenticated) {
        this.props.getCharacters(this.props.user._id);
      }
    }
  }

  onDeleteClick = id => {
    this.props.deleteCharacter(id);
  };
  render() {
    const { characters } = this.props.character;
    return (
      <Container>
        <ListGroup>
          {this.props.isAuthenticated ? (
            <TransitionGroup className="character-list">
              {characters.map(({ _id, name }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>

                    {name}
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          ) : null}
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  character: state.character,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});
export default connect(mapStateToProps, { getCharacters, deleteCharacter })(
  CharacterList
);
