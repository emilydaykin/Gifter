import * as cartReducers from '../store/cart/cart.reducer';
import * as cartTypes from '../store/cart/cart.types';
import * as categoryReducers from '../store/categories/category.reducer';
import * as categoryTypes from '../store/categories/category.types';
import * as userReducers from '../store/user/user.reducer';
import * as userTypes from '../store/user/user.types';

const mockCartItem = {
  id: 35,
  name: 'Smart Watch - Track your steps, calories, sleep and more',
  imageUrl:
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  price: 105
};

test('Cart reducer returns correct initial state', () => {
  expect(cartReducers.cartReducer(undefined, {})).toEqual(cartReducers.CART_INITIAL_STATE);
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

test('Category reducer returns correct initial state', () => {
  expect(categoryReducers.categoriesReducer(undefined, {})).toEqual(
    categoryReducers.CATEGORIES_INITIAL_STATE
  );
});

test('Category reducer handles FETCH_CATEGORIES_START action correctly', () => {
  // no payload expected for this action type
  expect(
    categoryReducers.categoriesReducer(categoryReducers.CATEGORIES_INITIAL_STATE, {
      type: categoryTypes.CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
    })
  ).toEqual({ ...categoryReducers.CATEGORIES_INITIAL_STATE, isLoading: true });
});

test('Category reducer handles FETCH_CATEGORIES_SUCCESS action correctly', () => {
  expect(
    categoryReducers.categoriesReducer(categoryReducers.CATEGORIES_INITIAL_STATE, {
      type: categoryTypes.CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      payload: ['Christmas', 'Birthday', 'Anniversary']
    })
  ).toEqual({
    ...categoryReducers.CATEGORIES_INITIAL_STATE,
    categories: ['Christmas', 'Birthday', 'Anniversary']
  });
});

test('Category reducer handles FETCH_CATEGORIES_FAILURE action correctly', () => {
  expect(
    categoryReducers.categoriesReducer(categoryReducers.CATEGORIES_INITIAL_STATE, {
      type: categoryTypes.CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE,
      payload: 'there was an error'
    })
  ).toEqual({
    ...categoryReducers.CATEGORIES_INITIAL_STATE,
    error: 'there was an error'
  });
});

test('User reducer returns correct initial state', () => {
  expect(userReducers.userReducer(undefined, {})).toEqual(userReducers.USER_INITIAL_STATE);
});
