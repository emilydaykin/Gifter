import { CategoryItem } from '../categories/category.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';
import { createAction, withMatcher, Action, ActionWithPayload } from '../../reducer/reducer.utils';

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatcher(
  (bool: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem): void => {
  const matchingItemIndex = cartItems.findIndex((item) => item.id === productToAdd.id);

  if (matchingItemIndex === -1) {
    // item not yet in cart
    const updatedCartItems = [...cartItems, { ...productToAdd, quantity: 1 }];

    // createAction(CART_ACTION_TYPES.SET_CART_ITEMS, updatedCartItems);
    setCartItems(updatedCartItems);
  } else {
    // item already in cart
    const updatedCartItems = cartItems.map((item) => {
      return item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item;
    });

    // createAction(CART_ACTION_TYPES.SET_CART_ITEMS, updatedCartItems);
    setCartItems(updatedCartItems);
  }
};

export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem): void => {
  const updatedCartItems = cartItems.filter((item) => item.id !== productToRemove.id);

  // createAction(CART_ACTION_TYPES.SET_CART_ITEMS, updatedCartItems);
  setCartItems(updatedCartItems);
};

export const reduceItemQuantityInCart = (
  cartItems: CartItem[],
  productToReduce: CartItem
): void => {
  const quantityOfItem = productToReduce.quantity;

  const reduceQuantity = cartItems.map((item) => {
    return item.id === productToReduce.id ? { ...item, quantity: item.quantity - 1 } : item;
  });

  const removeItem = cartItems.filter((item) => item.id !== productToReduce.id);

  const updatedCartItems = quantityOfItem > 1 ? reduceQuantity : removeItem;

  // createAction(CART_ACTION_TYPES.SET_CART_ITEMS, updatedCartItems);
  setCartItems(updatedCartItems);
};
