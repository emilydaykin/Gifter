import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../firebase/firebase.utils';

const Register = () => {
  const blankForm = {
    displayName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };
  const [formData, setFormData] = useState(blankForm);

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
      // const userDocRef = await createUserDocumentFromAuth(response.user);
    }
  };

  const handleInputChange = (event) => {
    // console.log('event.target.value', event.target.value);
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  // console.log('formData', formData);

  return (
    <div>
      <h2>Register with your email and password</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor='displayName'>Display Name</label>
        <input
          type='text'
          id='displayName'
          value={formData.displayName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='passwordConfirmation'>Password Confirmation</label>
        <input
          type='password'
          id='passwordConfirmation'
          value={formData.passwordConfirmation}
          onChange={handleInputChange}
          required
        />
        <button type='submit'>Register!</button>
      </form>
    </div>
  );
};

export default Register;
