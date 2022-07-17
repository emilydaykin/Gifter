import { USER_ACTION_TYPES } from './user.types';
import { createAction, withMatcher, Action, ActionWithPayload } from '../../reducer/reducer.utils';
import { User } from 'firebase/auth';
import { UserData, AdditionalInfo } from '../../firebase/firebase.utils';

// ------------------------- Types ------------------------- //
export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;
export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>;
export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;
export type EmailSignInStart = ActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;
export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>;
export type SignInFailure = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILURE, Error>;
export type RegisterStart = ActionWithPayload<
  USER_ACTION_TYPES.REGISTER_START,
  { email: string; password: string; displayName: string }
>;
export type RegisterSuccess = ActionWithPayload<
  USER_ACTION_TYPES.REGISTER_SUCCESS,
  { user: User; additionalDetails: AdditionalInfo }
>;
export type RegisterFailure = ActionWithPayload<USER_ACTION_TYPES.REGISTER_FAILURE, Error>;
export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;
export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;
export type SignOutFailure = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILURE, Error>;

// ------------------------- Consts ------------------------- //
export const checkUserSession = withMatcher(
  (): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

export const setCurrentUser = withMatcher(
  (user: UserData): SetCurrentUser => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
);

export const googleSignInStart = withMatcher(
  (): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);

export const emailSignInStart = withMatcher(
  (email: string, password: string): EmailSignInStart =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
);

export const signInSuccess = withMatcher(
  (user: UserData & { id: string }): SignInSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

export const signInFailure = withMatcher(
  (error: Error): SignInFailure => createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error)
);

export const registerStart = withMatcher(
  (email: string, password: string, displayName: string): RegisterStart =>
    createAction(USER_ACTION_TYPES.REGISTER_START, { email, password, displayName })
);

export const registerSuccess = withMatcher(
  (user: User, additionalDetails: AdditionalInfo): RegisterSuccess =>
    createAction(USER_ACTION_TYPES.REGISTER_SUCCESS, { user, additionalDetails })
);

export const registerFailure = withMatcher(
  (error: Error): RegisterFailure => createAction(USER_ACTION_TYPES.REGISTER_FAILURE, error)
);

export const signOutStart = withMatcher(
  (): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);

export const signOutSuccess = withMatcher(
  (): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);

export const signOutFailure = withMatcher(
  (error: Error): SignOutFailure => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, error)
);
