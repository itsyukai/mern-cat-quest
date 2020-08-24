import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAdmin: false,
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case USER_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        isAdmin: action.payload.isAdmin,
        user: action.payload.user,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isAdmin: action.payload.user.isAdmin,
        isLoading: false,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAdmin: false,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAdmin: false,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
