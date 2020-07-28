// root reducer
import { combineReducers } from "redux";
import inventoryReducer from "./inventoryReducer";
import characterReducer from "./characterReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  inventory: inventoryReducer,
  character: characterReducer,
  error: errorReducer,
  auth: authReducer,
});
