import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { Provider } from 'react-redux';
import { store } from '../store/store';

test('Gift categories are rendered', async () => {
  // await act(async () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    // )
  );

  // waitFor better than wrapping the render with act()
  await waitFor(() => {
    const xmasCategory = screen.getByText(/christmas/i);
    expect(xmasCategory).toBeInTheDocument();
  });

  await waitFor(() => {
    const bdayCategory = screen.getByText(/birthday/i);
    expect(bdayCategory).toBeInTheDocument();
  });

  await waitFor(() => {
    const annivCategory = screen.getByText(/anniversary/i);
    expect(annivCategory).toBeInTheDocument();
  });

  await waitFor(() => {
    const tyCategory = screen.getByText(/thank you/i);
    expect(tyCategory).toBeInTheDocument();
  });
});

test('Navbar displayed correctly', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  const appName = screen.getByText(/gifter/i);
  expect(appName).toBeInTheDocument();

  const navbar = screen.getAllByRole('navbar-item');
  console.log('navbar', navbar);
  expect(navbar.length).toEqual(4);

  const expectedNavbarLinks = ['about', 'shop', 'auth'];
  const navbarLinks = navbar.map((navbarItem) => navbarItem.href);

  expectedNavbarLinks.forEach((navbarItem) => {
    navbarLinks.includes(navbarItem);
  });
});
