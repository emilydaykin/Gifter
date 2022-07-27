import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SignIn from '../components/auth/SignIn';
import LogIn from '../components/auth/LogIn';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const mockUser = {
  email: 'mock@user.com',
  password: 'mockPassword1!'
};

test('Sign In page (/auth) buttons rendered correctly', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    </Provider>
  );

  const buttons = screen.getAllByRole('button', { className: /button/i });

  // const buttons = screen.getAllByRole('button');
  expect(buttons.length).toEqual(3);

  const expectedButtons = ['log in!', 'register!', 'log in with google'];
  const actualButtons = buttons.map((button) => button.innerHTML.toLowerCase());

  expectedButtons.forEach((button) => {
    expect(actualButtons).toContainEqual(button);
  });
});

test('Sign In page (/auth) headings displayed correctly', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    </Provider>
  );

  const logInHeader = screen.getByText(/i already have an account/i);
  expect(logInHeader).toBeInTheDocument();

  const registerHeader = screen.getByText(/i don't have an account/i);
  expect(registerHeader).toBeInTheDocument();

  const subHeaders = screen.getAllByText(/with your email and password/i);
  expect(subHeaders.length).toEqual(2);
});

test('Assert log in user inputs are accepted and displayed correctly', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    </Provider>
  );

  const emailInput = screen.getByLabelText('Email', { selector: 'input' });
  const passwordInput = screen.getByLabelText('Password', { selector: 'input' });

  // console.log('logInEmailInput', logInEmailInput);
  // console.log('logInEmailInput.length', logInEmailInput.length);

  // Get the form's button element with a (case-insensitive) classname of 'button'
  // const submitButton = screen.getByRole('button', { className: /button/i });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();

  // simulate user typing in email & pw to form's input fields:
  userEvent.type(emailInput, mockUser.email);
  userEvent.type(passwordInput, mockUser.password);

  // emailInput.value is from emailInput.pendingProps.value
  // console.log('emailInput', emailInput);
  // console.log('emailInput.value', emailInput.value);
  expect(emailInput.value).toEqual(mockUser.email);
  expect(passwordInput.value).toEqual(mockUser.password);
});
