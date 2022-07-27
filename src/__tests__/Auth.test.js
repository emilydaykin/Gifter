import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SignIn from '../components/auth/SignIn';
import LogIn from '../components/auth/LogIn';
import Register from '../components/auth/Register';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const mockUser = {
  displayName: 'mock user',
  email: 'mock@user.com',
  password: 'mockPassword1!',
  passwordConfirmation: 'mockPassword1!'
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

test('Assert Log In user inputs are accepted and displayed correctly', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    </Provider>
  );

  const emailInput = screen.getByLabelText('Email', { selector: 'input' });
  const passwordInput = screen.getByLabelText('Password', { selector: 'input' });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();

  userEvent.type(emailInput, mockUser.email);
  userEvent.type(passwordInput, mockUser.password);

  expect(emailInput.value).toEqual(mockUser.email);
  expect(passwordInput.value).toEqual(mockUser.password);
});

test('Assert Register user inputs are accepted and displayed correctly', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    </Provider>
  );

  const displayName = screen.getByLabelText('Display Name', { selector: 'input' });
  const emailInput = screen.getByLabelText('Email', { selector: 'input' });
  const passwordInput = screen.getByLabelText('Password', { selector: 'input' });
  const passwordConfirmationInput = screen.getByLabelText('Password Confirmation', {
    selector: 'input'
  });

  expect(displayName).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(passwordConfirmationInput).toBeInTheDocument();

  userEvent.type(displayName, mockUser.displayName);
  userEvent.type(emailInput, mockUser.email);
  userEvent.type(passwordInput, mockUser.password);
  userEvent.type(passwordConfirmationInput, mockUser.passwordConfirmation);

  expect(displayName.value).toEqual(mockUser.displayName);
  expect(emailInput.value).toEqual(mockUser.email);
  expect(passwordInput.value).toEqual(mockUser.password);
  expect(passwordConfirmationInput.value).toEqual(mockUser.passwordConfirmation);
});
