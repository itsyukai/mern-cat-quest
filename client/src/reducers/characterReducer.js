import {
  GET_CHARACTERS,
  ADD_CHARACTER,
  DELETE_CHARACTER,
  CHARACTERS_LOADING
} from "../actions/types";
const initialState = {
  characters: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
        loading: false
      };
    case DELETE_CHARACTER:
      return {
        ...state,
        characters: state.characters.filter(
          character => character._id !== action.payload
        )
      };
    case ADD_CHARACTER:
      return {
        ...state,
        characters: [action.payload, ...state.characters]
      };
    case CHARACTERS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
