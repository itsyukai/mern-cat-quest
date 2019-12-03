// root reducer
import { combineReducers } from "redux";
import characterReducer from "./characterReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  character: characterReducer,
  error: errorReducer,
  auth: authReducer
});
