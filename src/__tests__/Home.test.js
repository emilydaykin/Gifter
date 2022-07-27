import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Home from '../components/Home';

test('Gift categories are rendered', async () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  expect.assertions(6);

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

  await waitFor(() => {
    const weddingCategory = screen.getByText(/wedding/i);
    expect(weddingCategory).toBeInTheDocument();
  });

  const browseNowText = screen.queryAllByText(
    (content, element) =>
      element.tagName.toLowerCase() === 'p' &&
      element.innerHTML.toLowerCase().includes('browse now')
  );
  expect(browseNowText).toHaveLength(5);
});

test('Assert Footer is displayed on Home Page', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  expect.assertions(1);

  const footer = screen.getByText(/copyright/i);
  expect(footer).toBeInTheDocument();
});
