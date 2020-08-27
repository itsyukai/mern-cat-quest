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

const StyledContainer = withStyles({
  root: {
    width: "600px",
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
    inventory: PropTypes.array,
  };

  state = {
    catalogue: [
      {
        name: "Potato",
        desciption: "Boil em, mash em, stick em in a stew.",
        price: 5,
        quantity: 0,
      },
      {
        name: "Carrot",
        description: "They're not actually good for your eyes",
        price: 3,
        quantity: 0,
      },
      {
        name: "Bitterwort Root",
        description: "Kinda gross",
        price: 15,
        quantity: 0,
      },
      {
        name: "Less Bitterwort Root",
        description: "Less gross",
        price: 20,
        quantity: 0,
      },
      {
        name: "Super Bitterwort Root",
        description: "Super gross",
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
    let catalogue = [...this.state.catalogue];
    let item = { ...catalogue[index] };

    if (e.target.value >= MIN_VALUE && e.target.value <= MAX_VALUE) {
      item.quantity = e.target.value;
    } else if (e.target.value < MIN_VALUE) {
      e.target.value = item.quantity = MIN_VALUE;
    } else if (e.target.value > MAX_VALUE) {
      e.target.value = item.quantity = MAX_VALUE;
    }
    catalogue[index] = item;
    this.setState({ catalogue });
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
                          <Button variant="contained" color="default">
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
  items: state.inventory.inventory,
});
export default connect(mapStateToProps, {})(ShopScreen);
