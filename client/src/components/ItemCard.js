import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";

import PropTypes from "prop-types";

const StyledCard = withStyles({
  root: {
    width: "125px",
    height: "150px",
    margin: "0.5rem",
  },
})(Card);
const StyledCardMedia = withStyles({
  root: {
    margin: "auto",
    height: "72px",
    width: "72px",
  },
})(CardMedia);
const StyledTypography = withStyles({
  root: {
    overflow: "hidden",
    textAlign: "center",
    height: "1.5rem",
  },
})(Typography);
class ItemCard extends Component {
  static propTypes = {
    item: PropTypes.object,
  };
  render() {
    const { item } = this.props;
    return (
      <StyledCard>
        <CardContent>
          <StyledTypography component="h5">
            {item != null ? item.name : "???"}
          </StyledTypography>

          {item != null && item.img != null ? (
            <StyledCardMedia image={item.img} />
          ) : (
            <StyledCardMedia image="images/missing.png" />
          )}
          <StyledTypography>
            {item != null ? "Quantity: " + item.quantity : "???"}
          </StyledTypography>
        </CardContent>
      </StyledCard>
    );
  }
}
export default ItemCard;
