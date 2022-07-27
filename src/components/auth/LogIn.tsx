import { FC, useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { selectCurrentUser, selectUserReducer } from '../../store/user/user.selector';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';
import FormElement from '../FormElement';

const LogIn: FC = () => {
  const dispatch = useDispatch();
  const blankForm = {
    logInEmail: '',
    logInPassword: ''
  };
  const [formData, setFormData] = useState(blankForm);
  const [errorMessage, setErrorMessage] = useState('');
  const currentUser = useSelector(selectCurrentUser);
  const userState = useSelector(selectUserReducer);

  // console.log('form data from log in:', formData);
  useEffect(() => {
    if (!userState.error || currentUser !== null || formData === blankForm) {
      setErrorMessage('');
      setFormData(blankForm);
      console.log('--NO ERROR--');
    } else {
      switch ((userState.error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          setErrorMessage('Wrong password.');
          break;
        case AuthErrorCodes.USER_DELETED:
          setErrorMessage('Email not registered.');
          break;
        default:
          // setErrorMessage('Error logging in.'); // this would show up with register error
          setErrorMessage('');

        // if (
        //   (userState.error as AuthError).code === AuthErrorCodes.INVALID_PASSWORD ||
        //   AuthErrorCodes.USER_DELETED
        // ) {
        //   console.error(`Log In error: ${userState.error}`);
        //   setErrorMessage('Incorrect email and/or password.');
        // } else {
        //   console.error(`Log In error: ${userState.error}`);
        //   setErrorMessage('Error logging in.');
        // }
      }
    }
  }, [userState]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const logInWithGoogle = async () => {
    setErrorMessage('');
    dispatch(googleSignInStart());
  };

  const handleLogIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(emailSignInStart(formData.logInEmail, formData.logInPassword));
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
