import { render, screen } from '@testing-library/react';
import Categories from '../components/Categories';

test('Gifts categories are rendered', () => {
  render(<Categories />);
  const xmasCategory = screen.getByText(/christmas/i);
  const bdayCategory = screen.getByText(/birthday/i);
  const annivCategory = screen.getByText(/anniversary/i);
  const tyCategory = screen.getByText(/thank you/i);

  expect(xmasCategory).toBeInTheDocument();
  expect(bdayCategory).toBeInTheDocument();
  expect(annivCategory).toBeInTheDocument();
  expect(tyCategory).toBeInTheDocument();
});
