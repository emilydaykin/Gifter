import { render } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const mockProduct = {
  id: 25,
  name: 'Garden Book Shelf Box',
  imageUrl:
    'https://images.unsplash.com/photo-1591492654773-6756035bef6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c2VsZWN0aW9uJTIwbm9uJTIwZmljdGlvbiUyMGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
  price: 87.5
};

test('Product Card in Shop preview renders', () => {
  const view = render(
    <Provider store={store}>
      <ProductCard product={mockProduct} preview={true} />
    </Provider>
  );

  expect.assertions(1);

  expect(view).toMatchSnapshot();
});

test('Product Card in specific shop category renders', () => {
  const view = render(
    <Provider store={store}>
      <ProductCard product={mockProduct} preview={false} />
    </Provider>
  );

  expect.assertions(1);

  expect(view).toMatchSnapshot();
});
