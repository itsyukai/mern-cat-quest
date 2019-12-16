import axios from "axios";
import {
  GET_CHARACTERS,
  ADD_CHARACTER,
  DELETE_CHARACTER,
  CHARACTERS_LOADING
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getCharacters = id => (dispatch, getState) => {
  dispatch(setCharactersLoading());
  axios
    .get(`/api/characters/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_CHARACTERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const addCharacter = character => (dispatch, getState) => {
  axios
    .post("/api/characters", character, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_CHARACTER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deleteCharacter = id => (dispatch, getState) => {
  axios
    .delete(`/api/characters/d/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_CHARACTER,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setCharactersLoading = () => {
  return {
    type: CHARACTERS_LOADING
  };
};
