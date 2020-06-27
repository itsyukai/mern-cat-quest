import React, { Component } from "react";
import { Container, Paper } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";

const StyledPaper = withStyles({
  root: {
    height: "250px",
    maxWidth: "600px",
    padding: "1rem",
  },
})(Paper);

class MessageLog extends Component {
  render() {
    return (
      <Container>
        <StyledPaper>
          <p style={{ whiteSpace: "pre-wrap" }}>{this.props.message}</p>
        </StyledPaper>
      </Container>
    );
  }
}

MessageLog.defaultProps = {
  message: "",
};
export default MessageLog;
