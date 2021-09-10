import React from "react";
import { connect } from 'react-redux';
import { Nav, Navbar, Container } from '@themesberg/react-bootstrap';
import { logoutUser, isLoggedByJwt } from "../services/index";

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
      <Nav.Item className="mt-2">Hello, {localStorage.getItem("username")}</Nav.Item>
      <Nav.Link href="#" onClick={logout}>Logout</Nav.Link>
    </>
  );

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0 ms-n3 me-n3 pb-3">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-end w-100">
          <div className="d-flex flex-nowrap flex-row">
            {isLoggedByJwt() ? userLinks : guestLinks}
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