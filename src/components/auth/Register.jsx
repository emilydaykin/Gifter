import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { registerStart } from '../../store/user/user.action';
import FormElement from '../FormElement';

const Register = () => {
  const dispatch = useDispatch();
  const blankForm = {
    displayName: '',
    registerEmail: '',
    registerPassword: '',
    passwordConfirmation: ''
  };
  const [formData, setFormData] = useState(blankForm);
  const [errorMessage, setErrorMessage] = useState('');

  const currentUser = useSelector(selectCurrentUser);

  const handleInputChange = (event) => {
    setErrorMessage('');
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (formData.registerPassword !== formData.passwordConfirmation) {
      setErrorMessage('Passwords do not match.');
      return;
    } else {
      try {
        dispatch(
          registerStart(formData.registerEmail, formData.registerPassword, formData.displayName)
        );
        setFormData(blankForm);
      } catch (error) {
        switch (error.code) {
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
            console.error(`Register error: ${error}`);
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
