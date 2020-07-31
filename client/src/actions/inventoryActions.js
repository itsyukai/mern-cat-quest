import axios from "axios";
import {
  GET_INVENTORY,
  ADD_ITEM,
  REMOVE_ITEM,
  INVENTORY_LOADING,
  INVENTORY_LOADED,
  ADD_CHARACTER,
  UPDATE_ITEM_AMOUNT,
} from "./types";

import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

// redux-thunk allows us to dispatch the action asynchronously
export const loadInventory = () => (dispatch, getState) => {
  console.log("inventoryActions: loadInventory");
  dispatch({ type: INVENTORY_LOADING });
  axios
    .get(`/api/auth/inventory`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_INVENTORY,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (item) => (dispatch, getState) => {
  axios
    .post("/api/inventory", item, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_CHARACTER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const removeItem = (id) => (dispatch, getState) => {
  axios.post(`/api/inventory/r/${id}`, tokenConfig(getState));
};

export const updateItemAmount = (id, amount) => (dispatch, getState) => {
  axios
    .post(`/api/inventory/u/${id}:${amount}`, amount, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: UPDATE_ITEM_AMOUNT,
        payload: res.data,
      })
    );
};
