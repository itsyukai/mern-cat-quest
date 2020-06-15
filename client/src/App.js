import React, { useEffect, useState } from "react";
import AppNavbar from "./components/AppNavbar";
import AccessForm from "./components/auth/AccessForm";
import CharacterScreen from "./components/CharacterScreen";

import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <AppNavbar />
          <Container>
            <AccessForm />
            <CharacterScreen />
          </Container>
        </header>
      </div>
    </Provider>
  );
}

export default App;
