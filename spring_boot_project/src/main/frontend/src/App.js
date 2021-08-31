import React, { Component } from "react";
import { Table, Card, Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Menu from "./Components/Menu/menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import AuthAlert from "./Components/AuthAlert";
import Upload from "./Components/Upload";
import Welcome from "./Components/Welcome";
import './App.css';
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    data: [],
    oldUrl: ""
  };

  getRows = (url) => {
    if (this.state.oldUrl != url) {
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken")
          }
        })
        .then((response) => {
          this.setState(() => {
            return {
              data: response.data,
              oldUrl: url
            };
          });
        })
        .catch((error) => {
        });
    }

    return this.state.data.map((el) => {
      return (
        <tr>
          <td>{el.id}</td>
          <td>{
            el.name != null ? el.name : el.username
          }</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <Router>
        <Menu />
        <Container>
          <Row>
            <Col lg={12} className="mt-5">
              <Switch>
                <Route path="/" exact component={Welcome} />
                <Route
                  path="/animalList"
                  exact
                  render={() => {
                    return (
                      <center>
                        <h1 className="mt-2 text-light">Animals</h1>
                        <hr />
                        <Table striped bordered hover variant="dark">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.getRows('http://localhost:8080/api/animals')}
                          </tbody>
                        </Table>
                      </center>
                    );
                  }}
                />
                <Route
                  path="/userList"
                  exact
                  render={() => {
                    return (
                      <center>
                        <h1 className="mt-2 text-light">Users</h1>
                        <hr />
                        <Table striped bordered hover variant="dark">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.getRows('http://localhost:8080/api/users')}
                          </tbody>
                        </Table>
                      </center>
                    );
                  }}
                />
                <Route path="/welcomeAlert" exact component={AuthAlert} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/files" exact component={Upload} />
                <Route
                  exact
                  path="/about"
                  render={() => <center><h1 className="mt-5 text-light">About Hotel: tel: 9379992</h1></center>}
                />
                <Route
                  path="/logout"
                  exact
                  render={() => <center><h2 className="mt-5 text-light">User loged out successfully!</h2></center>}
                />
                <Route path="*" exact>
                  <Redirect to="/" />
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}