import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";

import { updateInventory } from "../actions/inventoryActions";

const itemList = require("./ItemList.json");

const StyledHeader = withStyles({
  root: {
    textAlign: "center",
    marginBottom: "1rem",
    alignContent: "flex-start",
  },
})(Typography);
const StyledButton = withStyles({
  root: {
    width: "100%",
    color: "white",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
})(Button);
const StyledFormControl = withStyles({
  root: {
    width: "100%",
  },
})(FormControl);
const StyledPaper = withStyles({
  root: {
    backgroundColor: "#f5f5f5",
    padding: "1rem",
  },
})(Paper);
const StyledGrid = withStyles({
  root: {
    flexGrow: 1,
  },
})(Grid);
const StyledContainer = withStyles({
  root: {
    padding: "1rem",
    backgroundColor: "white",
    width: "600px",
  },
})(Paper);
const StyledOutterContainer = withStyles({
  root: {
    padding: "1rem",
    margin: "auto",
    backgroundColor: "#f5f5f5",
    display: "inline-block",
    alignContent: "flex-end",
  },
})(Paper);
const StyledOutterOutterContainerLol = withStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
})(Container);

const StyledDialog = withStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "red",
  },
})(Dialog);
const StyledCard = withStyles({
  root: {
    minWidth: "300px",
  },
})(Card);

class CraftScreen extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    inventory: PropTypes.object,
    updateInventory: PropTypes.func.isRequired,
    userid: PropTypes.string,
  };

  state = {
    dialogOpen: false,
    item: null,
    ingredients: ["", "", "", ""],
  };

  handleSelect = (e, index) => {
    let ingredients = JSON.parse(JSON.stringify(this.state.ingredients));

    ingredients[index] = e.target.value;
    this.setState({ ingredients });
  };

  onCombine = (e) => {
    e.preventDefault();

    // organize ingredients from dropdowns
    let providedIngredients = [];
    this.state.ingredients.forEach((ingredient) => {
      if (ingredient !== "" && ingredient !== "nothing") {
        providedIngredients.push(ingredient);
      }
    });

    // compare ingredients provided with item components
    var found = false;
    if (providedIngredients.length > 0) {
      var i = 0;
      while (i < itemList.length && !found) {
        if (this.arraysEqual(itemList[i].components, providedIngredients)) {
          found = true;
          i--; // to keep index consistent
        }
        i++;
      }
    }
    if (found) {
      let inventoryDeepCopy = JSON.parse(JSON.stringify(this.props.inventory));

      var needToAdd = true;
      // Update inventory copy
      inventoryDeepCopy.items.forEach((item) => {
        // Subtract Ingredients
        if (providedIngredients.indexOf(item.name) > -1) {
          // already made sure quantity > 0 in mapInventoryToMenu
          item.quantity -= 1;
        }
        if (item.name === itemList[i].name) {
          item.quantity += 1;
          needToAdd = false;
        }
      });
      // No existing item
      if (needToAdd) {
        var item = JSON.parse(JSON.stringify(itemList[i]));
        item["quantity"] = 1;
        inventoryDeepCopy.items.push(item);
      }

      inventoryDeepCopy.owner = this.props.userid;

      this.props.updateInventory(inventoryDeepCopy);
      this.setState({ item: itemList[i] }, this.openDialog());
    } else {
      this.openDialog();
    }
  };

  arraysEqual(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
    if (arr1.length !== arr2.length) return false;

    var arr1Copy = arr1.concat().sort();
    var arr2Copy = arr2.concat().sort();

    for (var i = 0; i < arr1.length; i++) {
      if (arr1Copy[i] !== arr2Copy[i]) return false;
    }
    return true;
  }
  openDialog = () => {
    this.setState({
      ...this.state,
      ingredients: ["", "", "", ""],
      dialogOpen: true,
    });
  };
  closeDialog = () => {
    this.setState({
      ...this.state,
      dialogOpen: false,
      item: null,
    });
  };

  renderDialog() {
    return (
      <StyledDialog
        id="craft-dialog"
        open={this.state.dialogOpen}
        onClose={this.closeDialog}
      >
        <StyledCard>
          <CardContent>
            {this.state.item != null
              ? this.renderSuccess()
              : this.renderFailure()}
          </CardContent>
        </StyledCard>
      </StyledDialog>
    );
  }
  renderSuccess() {
    return (
      <Fragment>
        <Typography variant="h3" component="h3">
          Success!
        </Typography>
        <Typography
          align="center"
          paragraph={true}
          color="textSecondary"
          variant="h5"
          component="h5"
        >
          {this.state.item.name}
        </Typography>
        <StyledPaper>
          <Typography paragraph={true} variant="body2" component="p">
            {this.state.item.craftMessage}
          </Typography>
        </StyledPaper>
      </Fragment>
    );
  }
  renderFailure() {
    return (
      <Fragment>
        <Typography>Failure!</Typography>
        <Typography>Dang, maybe you should complain to the dev.</Typography>
      </Fragment>
    );
  }
  render() {
    const { ingredients } = this.state;
    let mapInventoryToMenu = this.props.inventory.items
      .filter((item) => item.quantity > 0)
      .map((item) => (
        <MenuItem key={item.name} value={item.name}>
          {item.name}
        </MenuItem>
      ));
    return (
      <Fragment>
        {this.props.isAuthenticated ? (
          <Fragment>
            <StyledHeader variant="h5">Crafting</StyledHeader>
            <StyledOutterOutterContainerLol>
              <StyledOutterContainer>
                <StyledContainer>
                  <StyledGrid container spacing={3}>
                    <Grid item xs={6}>
                      <StyledPaper>
                        <StyledFormControl>
                          <InputLabel id="ingredient1-label">
                            Ingredient
                          </InputLabel>
                          <Select
                            id="ingredient1-select"
                            value={ingredients[0]}
                            onChange={(e) => this.handleSelect(e, 0)}
                          >
                            {mapInventoryToMenu}
                          </Select>
                          <FormHelperText id="ingredient1-helper">
                            Ingredient 1
                          </FormHelperText>
                        </StyledFormControl>
                      </StyledPaper>
                    </Grid>
                    <Grid item xs={6}>
                      <StyledPaper>
                        <StyledFormControl>
                          <InputLabel id="ingredient2-label">
                            Ingredient
                          </InputLabel>
                          <Select
                            id="ingredient2-select"
                            value={ingredients[1]}
                            onChange={(e) => this.handleSelect(e, 1)}
                          >
                            {mapInventoryToMenu}
                          </Select>
                          <FormHelperText id="ingredient2-helper">
                            Ingredient 2
                          </FormHelperText>
                        </StyledFormControl>
                      </StyledPaper>
                    </Grid>
                    <Grid item xs={6}>
                      <StyledPaper>
                        <StyledFormControl>
                          <InputLabel id="ingredient3-label">
                            Ingredient
                          </InputLabel>
                          <Select
                            id="ingredient3-select"
                            value={ingredients[2]}
                            onChange={(e) => this.handleSelect(e, 2)}
                          >
                            {mapInventoryToMenu}
                          </Select>
                          <FormHelperText id="ingredient3-helper">
                            Ingredient 3
                          </FormHelperText>
                        </StyledFormControl>
                      </StyledPaper>
                    </Grid>
                    <Grid item xs={6}>
                      <StyledPaper>
                        <StyledFormControl>
                          <InputLabel id="ingredient4-label">
                            Ingredient
                          </InputLabel>
                          <Select
                            id="ingredient4-select"
                            value={ingredients[3]}
                            onChange={(e) => this.handleSelect(e, 3)}
                          >
                            {mapInventoryToMenu}
                          </Select>
                          <FormHelperText id="ingredient4-helper">
                            Ingredient 4
                          </FormHelperText>
                        </StyledFormControl>
                      </StyledPaper>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledButton onClick={this.onCombine}>
                        COMBINE :D
                      </StyledButton>
                    </Grid>
                  </StyledGrid>
                </StyledContainer>
              </StyledOutterContainer>
            </StyledOutterOutterContainerLol>
            {this.renderDialog()}
          </Fragment>
        ) : null}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  inventory: state.inventory,
  userid: state.auth._id,
});
export default connect(mapStateToProps, { updateInventory })(CraftScreen);
