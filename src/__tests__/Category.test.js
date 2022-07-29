import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Category from '../components/categories/Category';
import { Provider } from 'react-redux';
import { store } from '../store/store';

test('Category component renders', () => {
  const view = render(
    <Provider store={store}>
      <BrowserRouter>
        <Category />
      </BrowserRouter>
    </Provider>
  );

  expect.assertions(1);
  expect(view).toMatchSnapshot();
});
