import { takeLatest, all, call, put } from 'redux-saga/effects';
import { USER_ACTION_TYPES } from './user.types';
import {
  signInSuccess,
  signInFailure,
  registerSuccess,
  registerFailure,
  signOutSuccess,
  signOutFailure
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
export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(signUserInWithEmailAndPassword, email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* registerUser({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
    yield put(registerSuccess(user, { displayName }));
  } catch (error) {
    yield put(registerFailure(error));
  }
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure);
  }
}

export function* signInAfterRegister({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onRegisterStart() {
  yield takeLatest(USER_ACTION_TYPES.REGISTER_START, registerUser);
}

export function* onRegisterSuccess() {
  yield takeLatest(USER_ACTION_TYPES.REGISTER_SUCCESS, signInAfterRegister);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onSignOutSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onRegisterStart),
    call(onRegisterSuccess),
    call(onSignOutStart)
  ]);
}
