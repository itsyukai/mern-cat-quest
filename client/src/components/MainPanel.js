import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CharacterScreen from "./CharacterScreen";
import ShopScreen from "./ShopScreen";

import { Button, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const StyledPaper = withStyles({
  root: {
    padding: "1rem",
    marginTop: "1rem",
  },
})(Paper);
class MainPanel extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  render() {
    return (
      <div className="MainPanel">
        {this.props.isAuthenticated ? (
          <StyledPaper>
            <div className="tabs">
              <Button className="tab-character">Character</Button>
              <Button className="tab-shop">Shop</Button>
            </div>
            <CharacterScreen />
            <ShopScreen />
          </StyledPaper>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {})(MainPanel);
