import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Form, InputGroup, FormControl, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUser, faLock, faUndo } from "@fortawesome/free-solid-svg-icons";
import { registerUser } from '../../services/index';
import { useHistory } from "react-router-dom";

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
            <Row className="justify-content-md-center">
                <Col xs={5}>
                    {this.props.message && <Alert variant="success">{this.props.message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <FontAwesomeIcon icon={faSignInAlt} /> Register
                        </Card.Header>
                        <Card.Body>
                            <Form.Group as={Col}>
                                <InputGroup>
                                    <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                                    <FormControl required autoComplete="off" type="text" name="username" value={username} onChange={this.credentialChange}
                                        className={"bg-dark text-white"} placeholder="Enter Login" />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mt-3" as={Col}>
                                <InputGroup>
                                    <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                                    <FormControl required autoComplete="off" type="password" name="password" value={password} onChange={this.credentialChange}
                                        className={"bg-dark text-white"} placeholder="Enter Password" />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mt-3" as={Col}>
                                <InputGroup>
                                    <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                                    <FormControl required autoComplete="off" type="password" name="passwordConfirm" value={passwordConfirm} onChange={this.credentialChange}
                                        className={"bg-dark text-white"} placeholder="Confirm Password" />
                                </InputGroup>
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer style={{ "textAlign": "right" }}>
                            <Button size="sm" type="button" variant="success" onClick={this.validateUser}
                                disabled={this.state.username.length === 0 || this.state.password.length < 6 || this.state.passwordConfirm.length < 6 || this.state.password != this.state.passwordConfirm}>
                                <FontAwesomeIcon icon={faSignInAlt} /> Register
                            </Button>{' '}
                            <Button size="sm" type="button" variant="info" onClick={this.resetLoginForm}>
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
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