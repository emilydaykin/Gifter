import { render, screen } from '@testing-library/react';
// import Categories from '../components/Categories';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('Gift categories are rendered', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const xmasCategory = screen.getByText(/christmas/i);
  const bdayCategory = screen.getByText(/birthday/i);
  const annivCategory = screen.getByText(/anniversary/i);
  const tyCategory = screen.getByText(/thank you/i);

  expect(xmasCategory).toBeInTheDocument();
  expect(bdayCategory).toBeInTheDocument();
  expect(annivCategory).toBeInTheDocument();
  expect(tyCategory).toBeInTheDocument();
});
