import React, { useEffect } from "react";
import AppNavbar from "./components/AppNavbar";
import AccessForm from "./components/auth/AccessForm";
import MainPanel from "./components/MainPanel";
import Inventory from "./components/Inventory";

import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import { loadInventory } from "./actions/inventoryActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadInventory());
  });

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <AppNavbar />
          <Container>
            <AccessForm />
            <MainPanel />
            <Inventory />
          </Container>
        </header>
      </div>
    </Provider>
  );
}

export default App;
