import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../../firebase/firebase.utils';

import FormElement from '../FormElement';

const Register = () => {
  const blankForm = {
    displayName: '',
    registerEmail: '',
    registerPassword: '',
    passwordConfirmation: ''
  };
  const [formData, setFormData] = useState(blankForm);
  const [errorMessage, setErrorMessage] = useState('');

  const { currentUser } = useContext(UserContext); // this component will rerun when UserContext changes

  const handleInputChange = (event) => {
    setErrorMessage('');
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log('register clicked');

    if (formData.registerPassword !== formData.passwordConfirmation) {
      setErrorMessage('Passwords do not match.');
      return;
    } else {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          formData.registerEmail,
          formData.registerPassword
        );
        await createUserDocumentFromAuth(user, { displayName: formData.displayName });
        setFormData(blankForm);
      } catch (err) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            setErrorMessage('Email already registered.');
            break;
          case 'auth/invalid-email':
            setErrorMessage('Invalid email address.');
            break;
          case 'auth/weak-password':
            setErrorMessage('Password should be at least 6 characters long.');
            break;
          default:
            setErrorMessage('Error registering.');
            console.error(`Register error: ${err}`);
        }
      }
    }
  };

  return (
    <div className='register'>
      <h2>I don't have an account</h2>
      <span>
        <strong>Register</strong> with your email and password
      </span>
      <form onSubmit={handleRegister} className='form'>
        <FormElement
          label='Display Name'
          type='text'
          id='displayName'
          placeholder='Display Name'
          value={formData.displayName}
          onChange={handleInputChange}
          required
        />
        <FormElement
          label='Email'
          type='email'
          id='registerEmail'
          placeholder='Email'
          value={formData.registerEmail}
          onChange={handleInputChange}
          required
        />
        <FormElement
          label='Password'
          type='password'
          id='registerPassword'
          placeholder='Password'
          value={formData.registerPassword}
          onChange={handleInputChange}
          required
        />
        <FormElement
          label='Password Confirmation'
          type='password'
          id='passwordConfirmation'
          placeholder='Password Confirmation'
          value={formData.passwordConfirmation}
          onChange={handleInputChange}
          required
        />
        <p className='register__error-message'>{errorMessage}</p>
        {currentUser ? (
          <button className='button button--register button--disallowed' type='button'>
            You're registered!
          </button>
        ) : (
          <button className='button button--register' type='submit'>
            Register!
          </button>
        )}
      </form>
    </div>
  );
};

export default Register;
