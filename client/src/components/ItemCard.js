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
const StyledTitle = withStyles({
  root: {
    overflow: "hidden",
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
          <StyledTitle component="h5">
            {item != null ? item.name : "???"}
          </StyledTitle>

          {item != null && item.img != null ? (
            <StyledCardMedia image={item.img} />
          ) : (
            "no image :("
          )}
          <Typography>
            {item != null ? "Quantity: " + item.quantity : "???"}
          </Typography>
        </CardContent>
      </StyledCard>
    );
  }
}
export default ItemCard;
