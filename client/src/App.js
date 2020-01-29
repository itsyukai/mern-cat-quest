import React, { useEffect, useState } from "react";
import AppNavbar from "./components/AppNavbar";
import CharacterList from "./components/CharacterList";
import CharacterModal from "./components/CharacterModal";
import { Button, Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CharacterSheet from "./components/CharacterSheet";

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
            <CharacterSheet />
            <CharacterModal />
            <CharacterList />
          </Container>
        </header>
      </div>
    </Provider>
  );
}

export default App;
