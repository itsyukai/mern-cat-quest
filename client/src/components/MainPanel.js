import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CharacterScreen from "./CharacterScreen";
import ShopScreen from "./ShopScreen";
import CraftScreen from "./CraftScreen";

import { Button, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const StyledPaper = withStyles({
  root: {
    padding: "1rem",
    marginTop: "1rem",
  },
})(Paper);
class MainPanel extends Component {
  state = {
    activeTab: "shop",
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  getTabContent() {
    switch (this.state.activeTab) {
      case "shop":
        return <ShopScreen />;
      case "craft":
        return <CraftScreen />;
      case "character":
      default:
        return <CharacterScreen />;
    }
  }

  handleTabs = (e) => {
    this.setState({ activeTab: e });
  };
  render() {
    return (
      <div className="MainPanel">
        {this.props.isAuthenticated ? (
          <StyledPaper>
            <div className="tabs">
              <Button
                className="tab-character"
                onClick={() => this.handleTabs("character")}
              >
                Character
              </Button>
              <Button
                className="tab-shop"
                onClick={() => this.handleTabs("shop")}
              >
                Shop
              </Button>
              <Button
                className="tab-craft"
                onClick={() => this.handleTabs("craft")}
              >
                Craft
              </Button>
            </div>
            {this.getTabContent()}
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
