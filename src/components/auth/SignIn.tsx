import { FC } from 'react';
import LogIn from './LogIn';
import Register from './Register';
import Footer from '../Footer';

const SignIn: FC = () => {
  return (
    <>
      <div className='signInPage'>
        <LogIn />
        <Register />
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
