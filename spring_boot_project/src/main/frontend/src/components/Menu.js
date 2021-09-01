
import React, { useState } from "react";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faEnvelopeOpen, faSearch, faSignOutAlt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, InputGroup } from '@themesberg/react-bootstrap';
import { Routes } from "../routes";
import { logoutUser } from "../services/index";


const Menu = (props) => {
  const logout = () => {
    props.logoutUser();
  };

  const guestLinks = (
    <>
      <Nav.Link href="#login">Login</Nav.Link>
      <Nav.Link href="#register">Register</Nav.Link>
    </>
  );

  const userLinks = (
    <>
      <Nav.Link href="#" onClick={logout}>Logout</Nav.Link>
    </>
  );

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Form className="navbar-search">
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge search-bar">
                  <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                  <Form.Control type="text" placeholder="Search" />
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
          <div className="d-flex flex-nowrap flex-row">
            {props.auth.isLoggedIn ? userLinks : guestLinks}
          </div>
        </div>
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