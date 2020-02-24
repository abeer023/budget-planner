import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const enhancers = [];
const middlewares = [thunk];
enhancers.push(applyMiddleware(...middlewares));
process.env.NODE_ENV !== 'production' &&
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f);
const composedEnhancers = compose(...enhancers);
const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;
