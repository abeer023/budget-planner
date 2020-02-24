import { FETCH_TRANSACTION, NEW_TRANSACTION,DELETE_TRANSACTION } from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRANSACTION:
      return {
        ...state,
        items: action.payload
      };
    case NEW_TRANSACTION:
      return {
        ...state,
        item: action.payload
      };      
      case DELETE_TRANSACTION:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
