import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, register } from "../../actions/authActions";
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
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for login error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
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
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});
export default connect(mapStateToProps, { register, login, clearErrors })(
  AccessForm
);
