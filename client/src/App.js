import React from "react";
import AppNavbar from "./components/AppNavbar";
import CharacterList from "./components/CharacterList";
import CharacterModal from "./components/CharacterModal";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <AppNavbar />
          <Container>
            <CharacterModal />
            <CharacterList />
          </Container>
        </header>
      </div>
    </Provider>
  );
}

export default App;
