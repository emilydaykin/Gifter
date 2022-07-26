import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignIn from '../components/auth/SignIn';
import { Provider } from 'react-redux';
import { store } from '../store/store';

test('Sign In page (/auth) section rendered correctly', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    </Provider>
  );

  const buttons = screen.getAllByRole('button');
  expect(buttons.length).toEqual(3);

  const expectedButtons = ['log in!', 'register!', 'log in with google'];
  const actualButtons = buttons.map((button) => button.innerHTML.toLowerCase());
  console.log('actualButtons', actualButtons);

  expectedButtons.forEach((button) => {
    expect(actualButtons).toContainEqual(button);
  });
});
