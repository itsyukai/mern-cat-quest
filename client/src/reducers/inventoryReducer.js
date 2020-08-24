import {
  GET_INVENTORY,
  CREATE_INVENTORY,
  UPDATE_INVENTORY,
  INVENTORY_LOADING,
  INVENTORY_LOADED,
} from "../actions/types";

const initialState = {
  inventory: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INVENTORY:
      return {
        ...state,
        inventory: action.payload.items,
        loading: false,
      };
    case CREATE_INVENTORY: {
      return {
        ...state,
        inventory: action.payload.items,
      };
    }
    case UPDATE_INVENTORY: {
      return {
        ...state,
        inventory: action.payload.items,
      };
    }
    case INVENTORY_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
