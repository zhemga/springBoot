import React, { Component } from "react";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Alert, Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { authenticateUser } from '../services/index';

import { Routes } from "../routes";
import BgImage from "../assets/img/illustrations/signin.svg";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    username: '', password: '', error: ''
  };

  credentialChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  authValidation = () => {
    setTimeout(() => {
      if (this.props.auth.isLoggedIn) {
        this.props.history.push("/");
      }
      else if (this.props.auth.isError) {
        this.resetLoginForm();
        this.setState({ "error": "Invalid login and password" });
      }
      else {
        this.authValidation();
      }
    }, 500);
  };

  validateUser = () => {
    this.props.authenticateUser(this.state.username, this.state.password);
    this.authValidation();
  };

  resetLoginForm = () => {
    this.setState(() => this.initialState);
  };

  render() {
    const { username, password, error } = this.state;

    return (
      <>
        <main>
          <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
            <Container>
              <p className="text-center">
                <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
                  <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
                </Card.Link>
              </p>
              {this.props.message && <Alert className="text-center" variant="success">{this.props.message}</Alert>}
              {error && <Alert className="text-center" variant="danger">{error}</Alert>}
              <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
                <Col xs={12} className="d-flex align-items-center justify-content-center">
                  <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                    <div className="text-center text-md-center mb-4 mt-md-0">
                      <h3 className="mb-0">Sign in to our platform</h3>
                    </div>
                    <Form className="mt-4">
                      <Form.Group id="email" className="mb-4">
                        <Form.Label>Your Email</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faEnvelope} />
                          </InputGroup.Text>
                          <Form.Control autoFocus required autoComplete="off" type="text" name="username" value={username} onChange={this.credentialChange} placeholder="example@company.com" />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Group id="password" className="mb-4">
                          <Form.Label>Your Password</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control required autoComplete="off" type="password" name="password" value={password} onChange={this.credentialChange} placeholder="Password" />
                          </InputGroup>
                        </Form.Group>
                      </Form.Group>
                      <Button variant="primary" className="w-100" onClick={this.validateUser}
                        disabled={this.state.username.length === 0 || this.state.password.length < 6}>
                        Sign in
                      </Button>
                    </Form>
                    <div className="d-flex justify-content-center align-items-center mt-4">
                      <span className="fw-normal">
                        Not registered?
                        <Card.Link as={Link} to={Routes.Register.path} className="fw-bold">
                          {` Create account `}
                        </Card.Link>
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    authenticateUser: (username, password) => dispatch(authenticateUser(username, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
