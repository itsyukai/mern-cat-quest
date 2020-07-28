import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import "./Inventory.scss";
import { Button, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import MessageLog from "./MessageLog";

const StyledPaper = withStyles({
  root: {
    padding: "1rem",
    marginTop: "1rem",
  },
})(Paper);
class Inventory extends Component {
  state = {};

  static propTypes = {
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    inventory: PropTypes.object,
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <StyledPaper>
            <h3> Inventory</h3>
          </StyledPaper>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, {})(Inventory);
