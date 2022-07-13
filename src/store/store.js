import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // this will be by default local storage in most web browsers
import { rootReducer } from './root-reducer';
import logger from 'redux-logger';
// import { loggerMiddleware } from './middleware/logger';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['user'] // blacklist the user reducer (since it comes from the auth state listener anyway)
  whitelist: ['cart']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Only show logs in dev, not prod!
const middlewares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean); // enhance our store
// const middlewares = [process.env.NODE_ENV === 'development' && loggerMiddleware].filter(Boolean); // enhance our store

// Allowing Chrome to use Redux Dev Tools if Chrome extension is installed, otherwise use Redux's compose:
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

// root-reducer
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
