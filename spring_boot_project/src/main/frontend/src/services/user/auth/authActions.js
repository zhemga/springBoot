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
        dispatch(success({ username: response.data.username, isLoggedIn: true }));
      })
      .catch((error) => {
        dispatch(failure({isError: true}));
      })
      
  };
};
export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: AT.LOGOUT_REQUEST,
    });
    localStorage.removeItem("jwtToken");
    dispatch(success(false));
  };
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
