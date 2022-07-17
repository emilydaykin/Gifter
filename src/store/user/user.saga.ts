import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import { User } from 'firebase/auth';
import { AdditionalInfo } from '../../firebase/firebase.utils';
import { USER_ACTION_TYPES } from './user.types';
import {
  signInSuccess,
  signInFailure,
  registerSuccess,
  registerFailure,
  signOutSuccess,
  signOutFailure,
  EmailSignInStart,
  RegisterStart,
  RegisterSuccess
} from './user.action';
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signUserInWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser
} from '../../firebase/firebase.utils';

// Generators

// Hardest one:
export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInfo) {
  try {
    const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);
    if (userSnapshot) {
      yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    }
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

export function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
  try {
    const userCredentials = yield* call(signUserInWithEmailAndPassword, email, password);

    if (userCredentials) {
      const { user } = userCredentials;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailure(error as Error));
  }
}

export function* registerUser({ payload: { email, password, displayName } }: RegisterStart) {
  try {
    const userCredentials = yield* call(createAuthUserWithEmailAndPassword, email, password);

    if (userCredentials) {
      const { user } = userCredentials;
      yield* put(registerSuccess(user, { displayName }));
    }
  } catch (error) {
    yield* put(registerFailure(error as Error));
  }
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailure(error as Error));
  }
}

export function* signInAfterRegister({ payload: { user, additionalDetails } }: RegisterSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onRegisterStart() {
  yield* takeLatest(USER_ACTION_TYPES.REGISTER_START, registerUser);
}

export function* onRegisterSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.REGISTER_SUCCESS, signInAfterRegister);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onRegisterStart),
    call(onRegisterSuccess),
    call(onSignOutStart)
  ]);
}
