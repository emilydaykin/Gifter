import * as cartReducers from '../store/cart/cart.reducer';
import * as categoryReducers from '../store/categories/category.reducer';
import * as userReducers from '../store/user/user.reducer';

test('Cart reducer renders correct initial state', () => {
  expect(cartReducers.cartReducer(undefined, {})).toEqual(cartReducers.CART_INITIAL_STATE);
});

test('Category reducer renders correct initial state', () => {
  expect(categoryReducers.categoriesReducer(undefined, {})).toEqual(
    categoryReducers.CATEGORIES_INITIAL_STATE
  );
});

test('User reducer renders correct initial state', () => {
  expect(userReducers.userReducer(undefined, {})).toEqual(userReducers.USER_INITIAL_STATE);
});
