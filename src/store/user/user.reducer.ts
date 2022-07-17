import { AnyAction } from 'redux';
import { USER_ACTION_TYPES } from './user.types';
import {
  signInFailure,
  registerFailure,
  signOutFailure,
  signOutSuccess,
  signInSuccess
} from './user.action';
import { UserData } from '../../firebase/firebase.utils';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
};

export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction) => {
  // const { type, payload } = action;

  if (signInSuccess.match(action)) {
    return {
      ...state, // always load the previous state first!
      currentUser: action.payload
    };
  } else if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null
    };
  } else if (
    signInFailure.match(action) ||
    signOutFailure.match(action) ||
    registerFailure.match(action)
  ) {
    return {
      ...state,
      error: action.payload
    };
  } else {
    return state;
  }

  // switch (type) {
  //   case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
  //     return {
  //       ...state, // always load the previous state first!
  //       currentUser: payload
  //     };
  //   case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
  //     return {
  //       ...state,
  //       currentUser: null
  //     };
  //   case USER_ACTION_TYPES.SIGN_IN_FAILURE:
  //   case USER_ACTION_TYPES.SIGN_OUT_FAILURE:
  //   case USER_ACTION_TYPES.REGISTER_FAILURE:
  //     return {
  //       ...state,
  //       error: payload
  //     };
  //   default:
  //     return state; // this here is different to the user.context reducer where an error was thrown
  // }
};
