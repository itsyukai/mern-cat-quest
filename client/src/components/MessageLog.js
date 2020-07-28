import React, { Component } from "react";
import { Container, Paper } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";

const StyledContainer = withStyles({
  root: {},
})(Container);
const StyledPaper = withStyles({
  root: {
    height: "250px",
    maxWidth: "600px",
    padding: "1rem",
    overflow: "auto",
  },
})(Paper);

class MessageLog extends Component {
  render() {
    return (
      <StyledContainer>
        <StyledPaper>
          <p style={{ whiteSpace: "pre-wrap" }}>{this.props.message}</p>
        </StyledPaper>
      </StyledContainer>
    );
  }
}

MessageLog.defaultProps = {
  message: "",
};
export default MessageLog;
