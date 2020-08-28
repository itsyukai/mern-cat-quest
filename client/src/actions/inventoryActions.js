import axios from "axios";
import {
  GET_INVENTORY,
  CREATE_INVENTORY,
  DELETE_INVENTORY,
  INVENTORY_LOADING,
  INVENTORY_LOADED,
  UPDATE_INVENTORY,
} from "./types";

import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

// redux-thunk allows us to dispatch the action asynchronously
export const loadInventory = () => (dispatch, getState) => {
  dispatch({ type: INVENTORY_LOADING });
  axios
    .get(`/api/inventories`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_INVENTORY,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "INVENTORY_NOT_FOUND"
        )
      )
    );
};

export const createInventory = (inventory) => (dispatch, getState) => {
  axios
    .post("/api/inventories", inventory, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: CREATE_INVENTORY,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteInventory = () => (dispatch, getState) => {
  axios
    .delete(`/api/inventories/}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_INVENTORY,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateInventory = (inventory) => (dispatch, getState) => {
  axios
    .put(`/api/inventories/`, inventory, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: UPDATE_INVENTORY,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
