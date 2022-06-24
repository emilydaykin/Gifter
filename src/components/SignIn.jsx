import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth
} from '../firebase/firebase.utils';

const SignIn = () => {
  useEffect(() => {
    const getAuthResponse = async () => {
      const resp = await getRedirectResult(auth);
      console.log('resp', resp);
      if (resp) {
        const userDocRef = await createUserDocumentFromAuth(resp.user);
      }
    };
    getAuthResponse();
  }, []);

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
    </div>
  );
};

export default SignIn;
