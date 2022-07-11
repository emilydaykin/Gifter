import { USER_ACTION_TYPES } from './user.types';

const INITIAL_STATE = {
  currentUser: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state, // always load the previous state first!
        currentUser: payload
      };
    default:
      return state; // this here is different to the user.context reducer where an error was thrown
  }
};
