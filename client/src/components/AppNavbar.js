import React, { Component } from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";

import Logout from "./auth/Logout";
class AppNavbar extends Component {
  state = {
    isOpen: false,
    anchorEl: null,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div>
        <MenuItem>
          <Logout />
        </MenuItem>
      </div>
    );

    const guestLinks = (
      <div>
        <MenuItem onClick={this.handleClose}>
          <RegisterModal />
        </MenuItem>
        <MenuItem onClick={this.handleClose}>
          <LoginModal />
        </MenuItem>
      </div>
    );
    return (
      <div>
        <AppBar position="static" color="transparent">
          <Toolbar variant="dense">
            <Button
              aria-controls="settings-menu"
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </Button>
            <Menu
              id="settings-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              {isAuthenticated ? authLinks : guestLinks}
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
