import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import "./Inventory.scss";
import { Button, Paper, List, ListItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const StyledPaper = withStyles({
  root: {
    padding: "1rem",
    marginTop: "1rem",
  },
})(Paper);

const StyledListItem = withStyles({
  root: {
    justifyContent: "space-between",
  },
})(ListItem);
class Inventory extends Component {
  state = {};

  static propTypes = {
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    inventory: PropTypes.array,
  };
  handleClick = (i) => {};
  render() {
    const { inventory, isAuthenticated } = this.props;
    let displayInventory = inventory
      ? inventory.map((item) => (
          <StyledListItem key={item.name}>
            <div className="left">
              {item.name} : {item.quantity}
            </div>
            <div className="right">
              <Button>+</Button>/<Button>-</Button>
            </div>
          </StyledListItem>
        ))
      : null;
    return isAuthenticated ? (
      <StyledPaper>
        <h3>Inventory</h3>
        <List>{displayInventory}</List>
      </StyledPaper>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  inventory: state.inventory.inventory,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, {})(Inventory);
