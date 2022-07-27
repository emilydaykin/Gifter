import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { Provider } from 'react-redux';
import { store } from '../store/store';

test('Navbar displayed correctly', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  expect.assertions(5);

  await waitFor(() => {
    const appName = screen.getByText(/gifter/i);
    expect(appName).toBeInTheDocument();
  });

  const navbar = screen.getAllByRole('navbar-item');
  console.log('navbar', navbar);
  expect(navbar).toHaveLength(4);

  const expectedNavbarLinks = ['about', 'shop', 'auth'];
  const navbarLinks = navbar.map((navbarItem) => navbarItem.href && navbarItem.href.split('/')[3]);

  expectedNavbarLinks.forEach((navbarItem) => {
    expect(navbarLinks).toContainEqual(navbarItem);
  });
});
