import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Dropdown,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";

import Logout from "./auth/Logout";
class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `${user.name}` : null}</strong>
          </span>
        </NavItem>

        <NavItem>
          <Logout />
        </NavItem>
        <NavbarToggler className="mr-2" />
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );
    return (
      <div>
        <Navbar expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/"> Cat</NavbarBrand>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
