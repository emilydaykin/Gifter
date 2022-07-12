import { CART_ACTION_TYPES } from './cart.types';

export const setIsCartOpen = (bool) => {
  return { type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool };
};

export const addItemToCart = (cartItems, productToAdd) => {
  const matchingItemIndex = cartItems.findIndex((item) => item.id === productToAdd.id);

  if (matchingItemIndex === -1) {
    // item not yet in cart
    const updatedCartItems = [...cartItems, { ...productToAdd, quantity: 1 }];

    return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: updatedCartItems };
  } else {
    // item already in cart
    const updatedCartItems = cartItems.map((item) => {
      return item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item;
    });

    return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: updatedCartItems };
  }
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const updatedCartItems = cartItems.filter((item) => item.id !== productToRemove.id);

  return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: updatedCartItems };
};

export const reduceItemQuantityInCart = (cartItems, productToReduce) => {
  const quantityOfItem = productToReduce.quantity;
  console.log('quantityOfItem', quantityOfItem);

  const reduceQuantity = cartItems.map((item) => {
    return item.id === productToReduce.id ? { ...item, quantity: item.quantity - 1 } : item;
  });

  const removeItem = cartItems.filter((item) => item.id !== productToReduce.id);

  const updatedCartItems = quantityOfItem > 1 ? reduceQuantity : removeItem;

  return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: updatedCartItems };
};
