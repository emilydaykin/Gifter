import * as cartReducers from '../store/cart/cart.reducer';
import * as categoryReducers from '../store/categories/category.reducer';
import * as userReducers from '../store/user/user.reducer';
import * as cartTypes from '../store/cart/cart.types';

const mockCartItem = {
  id: 35,
  name: 'Smart Watch - Track your steps, calories, sleep and more',
  imageUrl:
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  price: 105
};

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

test('Cart reducer sets cart items correctly', () => {
  expect(
    cartReducers.cartReducer(cartReducers.CART_INITIAL_STATE, {
      type: cartTypes.CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: mockCartItem
    }).cartItems
  ).toEqual(mockCartItem);

  expect(
    cartReducers.cartReducer(cartReducers.CART_INITIAL_STATE, {
      type: cartTypes.CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: mockCartItem
    }).isCartOpen
  ).toEqual(false);
});

test('Cart reducer sets cart dropdown state correctly', () => {
  expect(
    cartReducers.cartReducer(cartReducers.CART_INITIAL_STATE, {
      type: cartTypes.CART_ACTION_TYPES.SET_IS_CART_OPEN,
      payload: true
    }).isCartOpen
  ).toEqual(true);

  expect(
    cartReducers.cartReducer(cartReducers.CART_INITIAL_STATE, {
      type: cartTypes.CART_ACTION_TYPES.SET_IS_CART_OPEN,
      payload: false
    }).isCartOpen
  ).toEqual(false);
});
