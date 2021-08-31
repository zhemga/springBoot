import * as UT from "./userTypes";
import axios from "axios";

export const registerUser = (username, password, passwordConfirm) => {
  return (dispatch) => {
    let userObject = {"username" : username, "password" : password, "passwordConfirm" : passwordConfirm}; 
    dispatch(userRequest());
    axios
      .post("http://localhost:8080/api/public/register", userObject)
      .then((response) => {
        dispatch(userSuccess());
      })
      .catch((error) => {
        dispatch(userFailure(error.message));
      });
  };
};

const userRequest = () => {
  return {
    type: UT.USER_REQUEST,
  };
};

const userSuccess = () => {
  return {
    type: UT.USER_SUCCESS
  };
};

const userFailure = (error) => {
  return {
    type: UT.USER_FAILURE,
    payload: error,
  };
};
