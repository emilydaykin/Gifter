export enum USER_ACTION_TYPES {
  SET_CURRENT_USER = 'user/SET_CURRENT_USER',
  CHECK_USER_SESSION = 'user/CHECK_USER_SESSION',
  GOOGLE_SIGN_IN_START = 'user/GOOGLE_SIGN_IN_START',
  EMAIL_SIGN_IN_START = 'user/EMAIL_SIGN_IN_START',
  SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE = 'user/SIGN_IN_FAILURE',
  REGISTER_START = 'user/REGISTER_START',
  REGISTER_SUCCESS = 'user/REGISTER_SUCCESS',
  REGISTER_FAILURE = 'user/REGISTER_FAILURE',
  SIGN_OUT_START = 'user/SIGN_OUT_START',
  SIGN_OUT_SUCCESS = 'user/SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILURE = 'user/SIGN_OUT_FAILURE'
}
