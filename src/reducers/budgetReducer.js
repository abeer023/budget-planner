import { FETCH_BUDGET, NEW_BUDGET,EDIT_BUDGET,DELETE_BUDGET } from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_BUDGET:
      return {
        ...state,
        items: action.payload
      };
    case NEW_BUDGET:
      return {
        ...state,
        item: action.payload
      };
      case EDIT_BUDGET:
      return {
        ...state,
        items: action.payload
      };
      case DELETE_BUDGET:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
