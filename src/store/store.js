import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // this will be by default local storage in most web browsers
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// currying:
// const loggerMiddleware = (store) => (next) => (action) => {
//   // accounting for actions without types on them (i.e. not passed from us, e.g. via redux thunk)
//   if (!action.type) {
//     return next(action);
//   }
//   console.log('type:', action.type);
//   console.log('payload:', action.payload);
//   console.log('currentState:', store.getState());

//   next(action);

//   console.log('next state: ', store.getState());
// };

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'] // blacklist the user reducer (since it comes from the auth state listener anyway)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [logger]; // enhance our store
// const middlewares = [loggerMiddleware]; // enhance our store

const composedEnhancers = compose(applyMiddleware(...middlewares));

// root-reducer
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
