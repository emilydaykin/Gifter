import { USER_ACTION_TYPES } from './user.types';

const USER_INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null
};

export const userReducer = (state = USER_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state, // always load the previous state first!
        currentUser: payload
      };
    case USER_ACTION_TYPES.SIGN_IN_FAILURE:
      return {
        ...state,
        error: payload
      };
    default:
      return state; // this here is different to the user.context reducer where an error was thrown
  }
};
