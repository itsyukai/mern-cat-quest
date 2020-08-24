// root reducer
import { combineReducers } from "redux";
import inventoryReducer from "./inventoryReducer";
import characterReducer from "./characterReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

const appReducer = combineReducers({
  inventory: inventoryReducer,
  character: characterReducer,
  error: errorReducer,
  auth: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_SUCCESS") {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
