import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import NotFoundPage from "./NotFound";
import ServerError from "./ServerError";
import FindDoctor from "./FindDoctor";
import FindHospital from "./FindHospital";
import ShowAdmissions from "./ShowAdmissions";
import ControlAdmissions from "./ControlAdmissions";
import ControlHospitals from "./ControlHospitals";
import ControlRoles from "./ControlRoles";
import ControlUsers from "./ControlUsers";

// components
import Sidebar from "../components/Sidebar";
import Menu from "../components/Menu";
import Preloader from "../components/Preloader";


const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Menu />
          <Component {...props} />
        </main>
      </>
    )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Login.path} component={Login} />
    <RouteWithLoader exact path={Routes.Register.path} component={Register} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.Main.path} component={Main} />
    <RouteWithSidebar exact path={Routes.FindDoctor.path} component={FindDoctor} />
    <RouteWithSidebar exact path={Routes.FindHospital.path} component={FindHospital} />
    <RouteWithSidebar exact path={Routes.ShowAdmissions.path} component={ShowAdmissions} />
    <RouteWithSidebar exact path={Routes.ControlAdmissions.path} component={ControlAdmissions} />
    <RouteWithSidebar exact path={Routes.ControlHospitals.path} component={ControlHospitals} />
    <RouteWithSidebar exact path={Routes.ControlRoles.path} component={ControlRoles} />
    <RouteWithSidebar exact path={Routes.ControlUsers.path} component={ControlUsers} />
  </Switch>
);
