import React, { useState } from "react";
import { connect } from 'react-redux';
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingMedical, faUserNurse, faCalendar, faHospital, faRegistered, faSignInAlt, faTimes, faHome, faUser, faCalendarAlt, faScroll } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { isAdmin, isDoctor, isLoggedByJwt } from "../services/index";

import { Routes } from "../routes";

const Sidebar = (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  const guestNavItems = (
    <>
      <NavItem title="Login" link={Routes.Login.path} icon={faSignInAlt} />
      <NavItem title="Register" link={Routes.Register.path} icon={faRegistered} />
    </>
  );

  const adminNavItems = (
    <>
      <NavItem title="Control Admissions" link={Routes.ControlAdmissions.path} icon={faCalendarAlt} />
      <NavItem title="Control Hospitals" link={Routes.ControlHospitals.path} icon={faHospital} />
      <NavItem title="Control Roles" link={Routes.ControlRoles.path} icon={faScroll} />
      <NavItem title="Control Users" link={Routes.ControlUsers.path} icon={faUser} />
    </>
  );

  const userNavItems = (
    <>
      <NavItem title="Find a Doctor" link={Routes.FindDoctor.path} icon={faUserNurse} />
      <NavItem title="Find a Hospital" link={Routes.FindHospital.path} icon={faHospital} />
    </>
  );

  const usersNavItems = (
    <>
      {isDoctor() || isAdmin() ? <></> : userNavItems}
      {isAdmin() ? adminNavItems : <NavItem title="Your Admissions" link={Routes.ShowAdmissions.path} icon={faCalendar} />}
    </>
  );

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-end justify-end-md-center pb-4">
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon className="fa-2x" icon={faTimes} />
              </Nav.Link>
            </div>

            <Nav className="flex-column pt-3 pt-md-0">
              <Navbar.Brand className="m-3" href={Routes.Main.path}><FontAwesomeIcon className="text-secondary" icon={faHandHoldingMedical} /> <span className="border-bottom border-secondary">Medical Cabinet</span></Navbar.Brand>

              <Dropdown.Divider className="my-3 border-indigo" />
              <NavItem title="Main Page" icon={faHome} link={Routes.Main.path} />
              {isLoggedByJwt() ? usersNavItems : guestNavItems}
              <Dropdown.Divider className="my-3 border-indigo" />
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Sidebar);
