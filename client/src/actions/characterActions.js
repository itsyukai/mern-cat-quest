import axios from "axios";
import {
  GET_CHARACTERS,
  ADD_CHARACTER,
  DELETE_CHARACTER,
  CHARACTERS_LOADING
} from "./types";

export const getCharacters = () => dispatch => {
  dispatch(setCharactersLoading());
  axios.get("/api/characters").then(res =>
    dispatch({
      type: GET_CHARACTERS,
      payload: res.data
    })
  );
};
export const addCharacter = character => dispatch => {
  axios.post("/api/characters", character).then(res =>
    dispatch({
      type: ADD_CHARACTER,
      payload: res.data
    })
  );
};
export const deleteCharacter = id => dispatch => {
  axios.delete(`/api/characters/${id}`).then(res =>
    dispatch({
      type: DELETE_CHARACTER,
      payload: id
    })
  );
};

export const setCharactersLoading = () => {
  return {
    type: CHARACTERS_LOADING
  };
};
