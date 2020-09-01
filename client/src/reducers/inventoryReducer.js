import {
  GET_INVENTORY,
  CREATE_INVENTORY,
  UPDATE_INVENTORY,
  INVENTORY_LOADING,
  INVENTORY_LOADED,
} from "../actions/types";

const initialState = {
  items: [],
  gold: 0,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INVENTORY:
      return {
        ...state,
        gold: action.payload.gold,
        items: action.payload.items,
        loading: false,
      };
    case CREATE_INVENTORY: {
      return {
        ...state,
        gold: action.payload.inventory.gold,
        items: action.payload.inventory.items,
      };
    }
    case UPDATE_INVENTORY: {
      return {
        ...state,
        gold: action.payload.gold,
        items: action.payload.items,
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
