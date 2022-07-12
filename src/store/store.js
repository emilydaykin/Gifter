import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

//currying:
const loggerMiddleware = (store) => (next) => (action) => {
  // accounting for actions without types on them (i.e. not passed from us, e.g. via redux thunk)
  if (!action.type) {
    return next(action);
  }
  console.log('type:', action.type);
  console.log('payload:', action.payload);
  console.log('currentState:', store.getState());

  next(action);

  console.log('next state: ', store.getState());
};

// const middlewares = [logger]; // enhance our store
const middlewares = [loggerMiddleware]; // enhance our store

const composedEnhancers = compose(applyMiddleware(...middlewares));

// root-reducer
export const store = createStore(rootReducer, undefined, composedEnhancers);
