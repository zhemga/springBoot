import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { logoutUser } from "../../services/index";
import { connect } from "react-redux";

const Menu = (props) => {
  const logout = () => {
    props.logoutUser();
  };

  const guestLinks = (
    <>
      <Nav className="ml-auto">
        <Link to="/register" className="text-warning nav-link">
          Register
        </Link>
        <Link to="/login" className="text-warning nav-link">
          Login
        </Link>
      </Nav>
    </>
  );
  const userLinks = (
    <>
      <Nav>
        <Link to="/animalList" className="text-danger nav-link">
          Animal List
        </Link>
      </Nav>
      <Nav>
        <Link to="/userList" className="text-danger nav-link">
          User List
        </Link>
      </Nav>
      <Nav className="navbar-right">
        <Link to="/logout" className="nav-link" onClick={logout}>
          Logout
        </Link>
      </Nav>
    </>
  );

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link className="navbar-brand" to="/">Animal Hotel</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link className="nav-link" to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-link" to="/about/">About Hotel</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-link text-warning" to="/files">Files Up/Download</Link>
            </Nav.Link>
          </Nav>
          {props.auth.isLoggedIn ? userLinks : guestLinks}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);