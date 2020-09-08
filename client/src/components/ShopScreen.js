import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import { updateInventory } from "../actions/inventoryActions";

const StyledContainer = withStyles({
  root: {
    maxWidth: "600px",
    maxHeight: "600px",
    margin: "auto",
    overflow: "auto",
  },
})(TableContainer);
const StyledOutterContainer = withStyles({
  root: {
    padding: "24px",
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
const StyledHeader = withStyles({
  root: {
    textAlign: "center",
    marginBottom: "1rem",
    alignContent: "flex-start",
  },
})(Typography);
const StyledTableRow = withStyles({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "rgb(245 245 245)",
    },
  },
})(TableRow);

const MIN_VALUE = 0;
const MAX_VALUE = 99;

class ShopScreen extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    inventory: PropTypes.object,
    updateInventory: PropTypes.func.isRequired,
    userid: PropTypes.string,
  };

  state = {
    // Static data since only one shop anyway
    catalogue: [
      {
        name: "Potato",
        desc: "Boil em, mash em, stick em in a stew.",
        img: "images/food/potato.png",
        price: 5,
        quantity: 0,
      },
      {
        name: "Carrot",
        desc: "They're not actually good for your eyes",
        img: "images/food/carrot.png",
        price: 3,
        quantity: 0,
      },
      {
        name: "Beef",
        desc: "made in china",
        img: "images/food/beef.png",
        price: 5,
        quantity: 0,
      },
      {
        name: "Bitterwort Root",
        desc: "Kinda gross",
        price: 15,
        quantity: 0,
      },
      {
        name: "Less Bitterwort Root",
        desc: "Less gross",
        price: 20,
        quantity: 0,
      },
      {
        name: "Super Bitterwort Root",
        desc: "Super gross",
        price: 5,
        quantity: 0,
      },
    ],
  };
  getTotal = () => {
    return this.state.catalogue
      .map((item) => item.price * item.quantity)
      .reduce((sum, i) => sum + i, 0);
  };
  handleQuantityChange = (e, index) => {
    let catalogue = JSON.parse(JSON.stringify(this.state.catalogue));

    if (e.target.value >= MIN_VALUE && e.target.value <= MAX_VALUE) {
      catalogue[index].quantity = e.target.value;
    } else if (e.target.value < MIN_VALUE) {
      e.target.value = catalogue[index] = MIN_VALUE;
    } else if (e.target.value > MAX_VALUE) {
      e.target.value = catalogue[index] = MAX_VALUE;
    }
    this.setState({ catalogue });
  };

  purchase = (e) => {
    e.preventDefault();

    if (this.props.inventory.gold > this.getTotal()) {
      // using copy = {...inventory} or copy = inventory will make shallow copies
      // thus mutating state
      let inventoryDeepCopy = JSON.parse(JSON.stringify(this.props.inventory));
      let catalogueDeepCopy = JSON.parse(JSON.stringify(this.state.catalogue));

      inventoryDeepCopy.owner = this.props.userid;
      inventoryDeepCopy.gold -= this.getTotal();

      catalogueDeepCopy.forEach((shopItem) => {
        if (shopItem.quantity > 0) {
          const index = inventoryDeepCopy.items.findIndex(
            (item) => item.name === shopItem.name
          );
          if (index > -1) {
            inventoryDeepCopy.items[index].quantity += Number(
              shopItem.quantity
            );
          } else {
            const shopItemCopy = JSON.parse(JSON.stringify(shopItem));
            inventoryDeepCopy.items.push(shopItemCopy);
          }
          shopItem.quantity = 0;
        }
      });
      this.setState({
        ...this.state,
        catalogue: catalogueDeepCopy,
      });
      this.props.updateInventory(inventoryDeepCopy);
    } else {
      console.log(
        "YOU'RE BROKE FOOL, also I need to have an actual error message"
      );
    }
  };

  render() {
    const { catalogue } = this.state;
    let displayCatalogue = catalogue.map((item, index) => (
      <StyledTableRow key={item.name}>
        <TableCell>{item.name}</TableCell>
        <TableCell align="right">{item.price} g</TableCell>
        <TableCell />
        <TableCell>
          <TextField
            type="number"
            size="small"
            defaultValue={MIN_VALUE}
            variant="outlined"
            onChange={(e) => this.handleQuantityChange(e, index)}
            inputProps={{ min: MIN_VALUE, max: MAX_VALUE }}
          />
        </TableCell>
        <TableCell align="right">{item.price * item.quantity}</TableCell>
        <TableCell />
      </StyledTableRow>
    ));

    return (
      <Fragment>
        {this.props.isAuthenticated ? (
          <Fragment>
            <StyledHeader variant="h5">Shop</StyledHeader>

            <StyledOutterOutterContainerLol>
              <StyledOutterContainer>
                <StyledContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell />
                        <TableCell>Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {displayCatalogue}
                      <TableRow>
                        <TableCell colSpan={3} align="right" />
                        <TableCell>Total</TableCell>
                        <TableCell align="right">{this.getTotal()}</TableCell>
                        <TableCell />
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} />
                        <TableCell></TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="default"
                            onClick={this.purchase}
                          >
                            Purchase
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </StyledContainer>
              </StyledOutterContainer>
            </StyledOutterOutterContainerLol>
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
export default connect(mapStateToProps, { updateInventory })(ShopScreen);
