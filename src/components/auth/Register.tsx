import { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, selectUserReducer } from '../../store/user/user.selector';
import { registerStart } from '../../store/user/user.action';
import FormElement from '../FormElement';

const Register: FC = () => {
  const dispatch = useDispatch();
  const blankForm = {
    displayName: '',
    registerEmail: '',
    registerPassword: '',
    passwordConfirmation: ''
  };
  const [formData, setFormData] = useState(blankForm);
  const [errorMessage, setErrorMessage] = useState('');

  const userState = useSelector(selectUserReducer);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!userState.error || currentUser !== null) {
      setErrorMessage('');
      setFormData(blankForm);
      console.log('--NO ERROR--');
    } else {
      switch ((userState.error as AuthError).code) {
        case AuthErrorCodes.EMAIL_EXISTS:
          setErrorMessage('Email already registered.');
          break;
        case AuthErrorCodes.INVALID_EMAIL:
          setErrorMessage('Invalid email address.');
          break;
        case AuthErrorCodes.WEAK_PASSWORD:
          setErrorMessage('Password should be at least 6 characters long.');
          break;
        default:
          // setErrorMessage('Error registering.'); // this would show up with login error
          setErrorMessage('');
      }
    }
  }, [userState]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.registerPassword !== formData.passwordConfirmation) {
      setErrorMessage('Passwords do not match.');
      return;
    } else {
      dispatch(
        registerStart(formData.registerEmail, formData.registerPassword, formData.displayName)
      );
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
            {/* {isProcessingRegister ? <div className='loader-small'></div> : 'Register!'} */}
            Register!
          </button>
        )}
      </form>
    </div>
  );
};

export default Register;

//   // console.log('ERROR FROM DISPATCH:', error);
//   // } catch (error) {
//   // console.log('error!!!!', error);
//   // }
//   console.log('currentUser', currentUser);
//   console.log('userState', userState);
//   if (userState.error) {
//     switch ((userState.error as AuthError).code) {
//       // case 'auth/email-already-in-use':
//       case AuthErrorCodes.EMAIL_EXISTS:
//         setErrorMessage('Email already registered.');
//         break;
//       // case 'auth/invalid-email':
//       case AuthErrorCodes.INVALID_EMAIL:
//         setErrorMessage('Invalid email address.');
//         break;
//       // case 'auth/weak-password':
//       case AuthErrorCodes.WEAK_PASSWORD:
//         setErrorMessage('Password should be at least 6 characters long.');
//         break;
//       default:
//         setErrorMessage('Error registering.');
//     }
//     // if (userState.error.code) console.log(`type of error: ${typeof error}`);
//     // console.error(`!!!!!! Register error (1): ${error}`);
//   } else {
//     setFormData(blankForm);
//     console.log('--NO ERROR--');
//     // FirebaseError: Firebase: Error (auth/email-already-in-use).
//   }
//   // }

//   // } catch (error) {
//   //   console.error(`!!!!!! Register error (2): ${error}`);
//   //   switch ((error as AuthError).code) {
//   //     // case 'auth/email-already-in-use':
//   //     case AuthErrorCodes.EMAIL_EXISTS:
//   //       setErrorMessage('Email already registered.');
//   //       break;
//   //     // case 'auth/invalid-email':
//   //     case AuthErrorCodes.INVALID_EMAIL:
//   //       setErrorMessage('Invalid email address.');
//   //       break;
//   //     // case 'auth/weak-password':
//   //     case AuthErrorCodes.WEAK_PASSWORD:
//   //       setErrorMessage('Password should be at least 6 characters long.');
//   //       break;
//   //     default:
//   //       setErrorMessage('Error registering.');
//   //       console.error(`Register error: ${error}`);
//   //   }
//   // }
//   // }
// };
