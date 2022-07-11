import { combineReducers } from 'redux'; // to create a big final one

import { userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
  user: userReducer
});
