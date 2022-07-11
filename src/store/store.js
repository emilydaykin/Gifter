import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const middlewares = [logger]; // enhance our store

const composedEnhancers = compose(applyMiddleware(...middlewares));

// root-reducer
export const store = createStore(rootReducer, undefined, composedEnhancers);