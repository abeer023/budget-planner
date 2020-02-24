import { combineReducers } from 'redux';
import transactionReducer from './transactionReducer';
import budgetReducer from './budgetReducer';
import userReducer from './userReducer';

export default combineReducers({  
  transactions: transactionReducer,
  budgets: budgetReducer,
  auth: userReducer  
});
