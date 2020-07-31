import {
  GET_INVENTORY,
  ADD_ITEM,
  UPDATE_ITEM_AMOUNT,
  REMOVE_ITEM,
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
        inventory: action.payload,
        loading: false,
      };
    case ADD_ITEM: {
      return {
        ...state,
        inventory: [action.payload, ...state.inventory],
      };
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        inventory: state.inventory.filter(
          (item) => item._id !== action.payload
        ),
      };
    }
    case UPDATE_ITEM_AMOUNT: {
      return {
        ...state,
        inventory: action.payload,
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
