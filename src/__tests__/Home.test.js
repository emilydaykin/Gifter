import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Home from '../components/Home';

test('Assert Home Page category posters are displayed', async () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  // await waitFor(() => {
  const xmasCategory = screen.getByText(/christmas/i);
  expect(xmasCategory).toBeInTheDocument();
  // });

  const footer = screen.getByText(/copyright/i);
  expect(footer).toBeInTheDocument();

  const browseNowText = screen.queryAllByText(
    (content, element) =>
      element.tagName.toLowerCase() === 'p' &&
      element.innerHTML.toLowerCase().includes('browse now')
  );
  expect(browseNowText.length).toEqual(5);
});

test('Assert Footer is displayed on Home Page', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const footer = screen.getByText(/copyright/i);
  expect(footer).toBeInTheDocument();
});
