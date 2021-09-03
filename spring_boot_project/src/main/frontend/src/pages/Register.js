
import React, {Component} from "react";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { registerUser } from '../services/index';
import { Col, Row, Form, Card, Button, Container, InputGroup, Alert } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import BgImage from "../assets/img/illustrations/signin.svg";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    username: '', password: '', passwordConfirm: '', error: ''
  };

  credentialChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  regValidation = () => {
    setTimeout(() => {
      if (this.props.user.isRegistered) {
        this.props.history.push("/login");
      }
      else if (this.props.user.error != null) {
        this.setState({ "error": this.props.user.error });
        this.resetLoginForm();
      }
      else {
        this.regValidation();
      }
    }, 500);
  }

  validateUser = () => {
    this.props.registerUser(this.state.username, this.state.password, this.state.passwordConfirm);

    this.regValidation();
  };

  resetLoginForm = () => {
    this.setState({
      username: '', password: '', passwordConfirm: ''
    });
  };

  render() {
    const { username, password, passwordConfirm, error } = this.state;

    return (
      <>
        <main>
          <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
            <Container>
              <p className="text-center">
                <Card.Link as={Link} to={Routes.Main.path} className="text-gray-700">
                  <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
                </Card.Link>
              </p>
              {this.props.message && <Alert className="text-center" variant="success">{this.props.message}</Alert>}
              {error && <Alert className="text-center" variant="danger">{error}</Alert>}
              <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
                <Col xs={12} className="d-flex align-items-center justify-content-center">
                  <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                    <div className="text-center text-md-center mb-4 mt-md-0">
                      <h3 className="mb-0">Create an account</h3>
                    </div>
                    <Form className="mt-4">
                      <Form.Group id="email" className="mb-4">
                        <Form.Label>Your Email</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faEnvelope} />
                          </InputGroup.Text>
                          <Form.Control autoFocus required autoComplete="off" type="email" name="username" value={username} onChange={this.credentialChange} placeholder="example@company.com" />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group id="password" className="mb-4">
                        <Form.Label>Your Password</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUnlockAlt} />
                          </InputGroup.Text>
                          <Form.Control required autoComplete="off" type="password" name="password" value={password} onChange={this.credentialChange} placeholder="Password" />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group id="confirmPassword" className="mb-4">
                        <Form.Label>Confirm Password</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUnlockAlt} />
                          </InputGroup.Text>
                          <Form.Control required autoComplete="off" type="password" name="passwordConfirm" value={passwordConfirm} onChange={this.credentialChange} placeholder="Confirm Password" />
                        </InputGroup>
                      </Form.Group>

                      <Button variant="primary" className="w-100" onClick={this.validateUser}
                      disabled={this.state.username.length === 0 || this.state.password.length < 6 || this.state.passwordConfirm.length < 6 || this.state.password != this.state.passwordConfirm}>
                        Sign up
                      </Button>
                    </Form>

                    <div className="d-flex justify-content-center align-items-center mt-4">
                      <span className="fw-normal">
                        Already have an account?
                        <Card.Link as={Link} to={Routes.Login.path} className="fw-bold">
                          {` Login here `}
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
    user: state.user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (username, password, passwordConfirm) => dispatch(registerUser(username, password, passwordConfirm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
