import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from '../components/About';

test('About page renders all components', () => {
  render(
    <BrowserRouter>
      <About />
    </BrowserRouter>
  );

  const aboutSection = screen.getByText(/about/i);
  expect(aboutSection).toBeInTheDocument();

  const contactSection = screen.getByText(/contact/i);
  expect(contactSection).toBeInTheDocument();

  const createdWithSection = screen.getByText(/created with/i);
  expect(createdWithSection).toBeInTheDocument();
});
