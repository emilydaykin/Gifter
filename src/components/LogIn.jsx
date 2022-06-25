import { useState, useContext } from 'react';
import { UserContext } from '../contexts/user.context';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signUserInWithEmailAndPassword
} from '../firebase/firebase.utils';
import FormElement from './FormElement';

const LogIn = () => {
  const blankForm = {
    email: '',
    password: ''
  };
  const [formData, setFormData] = useState(blankForm);
  const [errorMessage, setErrorMessage] = useState('');
  const { setCurrentUser } = useContext(UserContext);

  const handleInputChange = (event) => {
    setErrorMessage('');
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    console.log('login clicked');

    try {
      const { user } = await signUserInWithEmailAndPassword(formData.email, formData.password);
      setCurrentUser(user);
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

  const logInWithGoogle = async () => {
    setErrorMessage('');
    const response = await signInWithGooglePopup();
    await createUserDocumentFromAuth(response.user);
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
          id='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <FormElement
          label='Password'
          type='password'
          id='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <p className='logIn__error-message'>{errorMessage}</p>
        <button className='button button--log-in' type='submit'>
          Log In!
        </button>
      </form>
      <button className='button button--google' onClick={logInWithGoogle}>
        Log In with Google
      </button>
    </div>
  );
};

export default LogIn;
