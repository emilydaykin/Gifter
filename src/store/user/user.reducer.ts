import { AnyAction } from 'redux';
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

export const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
};

export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction) => {
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
};
