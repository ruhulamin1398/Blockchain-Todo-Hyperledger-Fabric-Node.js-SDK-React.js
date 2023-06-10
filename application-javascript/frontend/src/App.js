import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateAsset from "./components/Create-asset";
import EditAsset from "./components/Edit-asset";
import AssetList from "./components/Asset-list";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/asset-list"} className="nav-link">
                Blockchain-Node-React App
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/create-asset"} className="nav-link">
                    Create Asset
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/asset-list"} className="nav-link">
                    All Asset
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={(props) => <CreateAsset {...props} />}
                  />
                  <Route
                    exact
                    path="/create-asset"
                    component={(props) => <CreateAsset {...props} />}
                  />
                  <Route
                    exact
                    path="/edit-asset/:id"
                    component={(props) => <EditAsset {...props} />}
                  />
                  <Route
                    exact
                    path="/asset-list"
                    component={(props) => <AssetList {...props} />}
                  />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;
