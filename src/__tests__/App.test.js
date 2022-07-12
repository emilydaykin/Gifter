import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { Provider } from 'react-redux';
import { store } from '../store/store';

test('Gift categories are rendered', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
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
