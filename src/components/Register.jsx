import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../firebase/firebase.utils';

import FormInput from './FormInput';

const Register = () => {
  const blankForm = {
    displayName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };
  const [formData, setFormData] = useState(blankForm);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log('register clicked');

    if (formData.password !== formData.passwordConfirmation) {
      alert('Passwords do not match');
      return;
    } else {
      try {
        const response = await createAuthUserWithEmailAndPassword(
          formData.email,
          formData.password
        );
        // console.log('reSPONSE', response);
        await createUserDocumentFromAuth(response.user, { displayName: formData.displayName });
        setFormData(blankForm);
      } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
          alert('Email already registered.');
        } else {
          console.error(`Register error: ${err}`);
        }
      }
    }
  };
  return (
    <div className='register'>
      <h2>Register with your email and password</h2>
      <form onSubmit={handleRegister} className='form'>
        <FormInput
          label='Display Name'
          type='text'
          id='displayName'
          value={formData.displayName}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label='Email'
          type='text'
          id='email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label='Password'
          type='password'
          id='password'
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label='Password Confirmation'
          type='password'
          id='passwordConfirmation'
          value={formData.passwordConfirmation}
          onChange={handleInputChange}
          required
        />
        <button className='button' type='submit'>
          Register!
        </button>
      </form>
    </div>
  );
};

export default Register;
