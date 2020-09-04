import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/paper";

import { withStyles } from "@material-ui/core/styles";
import ItemCard from "./ItemCard";

const StyledPaper = withStyles({
  root: {
    padding: "1rem",
    marginTop: "1rem",
  },
})(Paper);
const StyledItemsContainer = withStyles({
  root: {
    backgroundColor: "#f5f5f5",
    padding: "1rem",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
})(Paper);
class Inventory extends Component {
  state = {};

  static propTypes = {
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    inventory: PropTypes.object,
  };
  handleClick = (i) => {};
  render() {
    const { inventory, isAuthenticated } = this.props;
    let displayInventory = inventory
      ? inventory.items.map((item) => <ItemCard key={item.name} item={item} />)
      : null;
    return isAuthenticated ? (
      <StyledPaper>
        <h3>Inventory</h3>
        <StyledItemsContainer>{displayInventory}</StyledItemsContainer>
      </StyledPaper>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  inventory: state.inventory,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, {})(Inventory);
