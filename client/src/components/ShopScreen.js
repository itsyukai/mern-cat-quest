import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

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
      },
      {
        name: "Carrot",
        description: "They're not actually good for your eyes",
        price: 3,
      },
      {
        name: "Bitterwort Root",
        description: "Kinda gross",
        price: 15,
      },
    ],
  };

  render() {
    const { catalogue } = this.state;
    let displayCatalogue = catalogue.map((item) => (
      <TableRow>
        <TableCell>{item.name}</TableCell>
        <TableCell align="right">{item.price}</TableCell>
      </TableRow>
    ));

    return (
      <Fragment>
        {this.props.isAuthenticated ? (
          <Table>
            <TableHead>Shop</TableHead>
            <TableBody>{displayCatalogue}</TableBody>
          </Table>
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
