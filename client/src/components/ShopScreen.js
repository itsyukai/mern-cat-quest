import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
    maxHeight: "400px",
    margin: "auto",
    overflow: "auto",
  },
})(TableContainer);
const StyledHeader = withStyles({
  root: {
    textAlign: "center",
  },
})(Typography);
const StyledTableCell = withStyles({
  root: {
    width: "20%",
  },
})(TableCell);

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
      <TableRow key={item.name}>
        <TableCell>{item.name}</TableCell>
        <TableCell align="right">{item.price} g</TableCell>
        <TableCell />
        <StyledTableCell>
          <TextField
            type="number"
            size="small"
            defaultValue={MIN_VALUE}
            variant="outlined"
            onChange={(e) => this.handleQuantityChange(e, index)}
            inputProps={{ min: MIN_VALUE, max: MAX_VALUE }}
          />
        </StyledTableCell>
        <TableCell align="right">{item.price * item.quantity}</TableCell>
        <TableCell />
      </TableRow>
    ));

    return (
      <Fragment>
        {this.props.isAuthenticated ? (
          <StyledContainer component={Paper}>
            <StyledHeader variant="h5">Shop</StyledHeader>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell />
                  <StyledTableCell>Quantity</StyledTableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>{displayCatalogue}</TableBody>
            </Table>
          </StyledContainer>
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
