import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, register } from "../../actions/authActions";
import { loadInventory, createInventory } from "../../actions/inventoryActions";
import { clearErrors } from "../../actions/errorActions";
import "./AccessForm.scss";

class AccessForm extends Component {
  state = {
    displayLogin: true,
    name: "",
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    token: PropTypes.string,
    loadInventory: PropTypes.func.isRequired,
    createInventory: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, token } = this.props;

    if (token !== prevProps.token) {
      this.props.loadInventory();
    }
    if (error !== prevProps.error) {
      // Check for login error
      if (error.id === "LOGIN_FAIL" || error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else if (
        error.id === "INVENTORY_NOT_FOUND" &&
        this.props.isAuthenticated
      ) {
        const newInventory = {
          owner: this.props.user._id,
          gold: 0,
          items: [],
        };
        this.props.createInventory(newInventory);
      } else {
        this.setState({ msg: null });
      }
    }
  }

  toggle = () => {
    this.setState({
      displayLogin: !this.state.displayLogin,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  login = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    // Create user object
    const user = {
      email,
      password,
    };

    //Attempt to login
    this.props.login(user);
  };

  register = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;

    const newUser = {
      name,
      email,
      password,
    };
    this.props.register(newUser);
  };

  render() {
    const { isAuthenticated } = this.props;

    /* Login */
    const loginForm = (
      <div className="form-container">
        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
        <Form onSubmit={this.login}>
          <FormGroup>
            <Label for="email"> Email </Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={this.onChange}
              className="mb-3"
            />
            <Label for="password"> Password </Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={this.onChange}
              className="mb-3"
            />
            <Button color="dark" block>
              Login
            </Button>
          </FormGroup>
        </Form>
        <Button onClick={this.toggle} color="dark" block>
          Register
        </Button>
      </div>
    );

    /* Register */
    const registerForm = (
      <div className="form-container">
        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
        <Form onSubmit={this.register}>
          <FormGroup>
            <Label for="name"> Name </Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              onChange={this.onChange}
              className="mb-3"
            />

            <Label for="email"> Email </Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={this.onChange}
              className="mb-3"
            />
            <Label for="password"> Password </Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={this.onChange}
              className="mb-3"
            />
            <Button color="dark" style={{ marginTop: "2rem" }} block>
              Register
            </Button>
          </FormGroup>
        </Form>
        <Button onClick={this.toggle} color="dark" block>
          Login
        </Button>
      </div>
    );

    return (
      <div>
        {isAuthenticated
          ? null
          : this.state.displayLogin
          ? loginForm
          : registerForm}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  error: state.error,
});
export default connect(mapStateToProps, {
  loadInventory,
  register,
  login,
  clearErrors,
  createInventory,
})(AccessForm);
