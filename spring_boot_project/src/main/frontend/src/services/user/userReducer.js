import * as UT from "./userTypes";

const initialState = {
  isRegistered: false,
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UT.USER_REQUEST:
      return {
        ...state,
      };
    case UT.USER_SUCCESS:
      return {
        error: "",
        isRegistered: true,
      };
    case UT.USER_FAILURE:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
