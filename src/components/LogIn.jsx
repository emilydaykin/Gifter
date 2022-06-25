import { useState } from 'react';
import {
  auth,
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

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    console.log('login clicked');

    try {
      const response = await signUserInWithEmailAndPassword(formData.email, formData.password);
      console.log('LOG IN response', response);
      setFormData(blankForm);
    } catch (err) {
      console.error(`Register error: ${err}`);
    }
  };

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
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
        <button className='button button--log-in' type='submit'>
          Log In!
        </button>
      </form>
      <button className='button button--google' onClick={logGoogleUser}>
        Log In with Google
      </button>
    </div>
  );
};

export default LogIn;
