import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import {
  signInWithGooglePopup,
  signUserInWithEmailAndPassword
} from '../../firebase/firebase.utils';
import FormElement from '../FormElement';

const LogIn = () => {
  const blankForm = {
    logInEmail: '',
    logInPassword: ''
  };
  const [formData, setFormData] = useState(blankForm);
  const [errorMessage, setErrorMessage] = useState('');
  const { currentUser } = useContext(UserContext);

  const handleInputChange = (event) => {
    setErrorMessage('');
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const logInWithGoogle = async () => {
    setErrorMessage('');
    await signInWithGooglePopup();
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    console.log('login clicked');

    try {
      await signUserInWithEmailAndPassword(formData.logInEmail, formData.logInPassword);
      setFormData(blankForm);
    } catch (err) {
      if (err.code === 'auth/wrong-password' || 'auth/user-not-found') {
        setErrorMessage('Incorrect email and/or password.');
      } else {
        console.error(`Log In error: ${err}`);
        setErrorMessage('Error logging in.');
      }
    }
  };

  return (
    <div className='logIn'>
      <h2>I already have an account</h2>
      <span>
        <strong>Log In</strong> with your email and password
      </span>
      <form onSubmit={handleLogIn} className='form'>
        <FormElement
          label='Email'
          type='email'
          id='logInEmail'
          placeholder='Email'
          value={formData.logInEmail}
          onChange={handleInputChange}
          required
        />
        <FormElement
          label='Password'
          type='password'
          id='logInPassword'
          placeholder='Password'
          value={formData.logInPassword}
          onChange={handleInputChange}
          required
        />
        <p className='logIn__error-message'>{errorMessage}</p>
        {currentUser ? (
          <button className='button button--log-in button--disallowed' type='button'>
            You're logged in!
          </button>
        ) : (
          <button className='button button--log-in' type='submit'>
            Log In!
          </button>
        )}
      </form>
      {!currentUser && (
        <button className='button button--google' onClick={logInWithGoogle}>
          Log In with Google
        </button>
      )}
    </div>
  );
};

export default LogIn;
