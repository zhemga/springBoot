import * as AT from "./authTypes";
import axios from "axios";

export const authenticateUser = (username, password) => {
  const credentials = {
    username: username,
    password: password,
  };
  return (dispatch) => {
    dispatch({
      type: AT.LOGIN_REQUEST,
    });
    axios
      .post("http://localhost:8080/api/public/login", credentials)
      .then((response) => {
        let token = response.headers.authorization;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("roles", JSON.stringify(response.data.roles));
        localStorage.setItem("username", JSON.stringify(response.data.username));
        dispatch(success({ username: response.data.username, isLoggedIn: true }));
      })
      .catch((error) => {
        dispatch(failure({ isError: true }));
      })

  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: AT.LOGOUT_REQUEST,
    });
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    window.location = "/";
    dispatch(success(false));
  };
};

export const isLoggedByJwt = () => {
  let token = localStorage.getItem("jwtToken");
  let username = localStorage.getItem("username");
  let roles = localStorage.getItem("roles");
  let isInUserRole = false;
  if (roles != null)
    isInUserRole = JSON.parse(roles).some(x => x.authority == "User");

  return isInUserRole && token != null && username != null;
};

const success = (isLoggedIn) => {
  return {
    type: AT.SUCCESS,
    payload: isLoggedIn,
  };
};

const failure = (isError) => {
  return {
    type: AT.FAILURE,
    payload: isError,
  };
};
