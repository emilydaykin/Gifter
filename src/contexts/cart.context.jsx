import { createContext, useReducer } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  reduceItemQuantityInCart: () => {},
  cartItemCount: 0,
  cartTotalPrice: 0
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartItemCount: 0,
  cartTotalPrice: 0
};

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS'
};

const cartReducer = (state, action) => {
  console.log('dispatched (cart)~');
  console.log('action (cart):', action);
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
    default:
      throw new Error(`Unknown type '${type}' in the CartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  console.log('CART state:', state);
  const { isCartOpen, cartItems, cartItemCount, cartTotalPrice } = state;

  const setIsCartOpen = (bool) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
  };

  const updateCartItemsReducer = (updatedCartItems) => {
    // Generate new Cart Item Count:
    const updatedItemCount = updatedCartItems.reduce((prev, curr) => prev + curr.quantity, 0);

    // Generate new Cart Total Price:
    const finalPrice = updatedCartItems.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0
    );
    const finalPriceRounded = finalPrice % 1 > 0 ? finalPrice.toFixed(2) : finalPrice;

    // Dispatch new action with payload with 3 items:
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: updatedCartItems,
        cartItemCount: updatedItemCount,
        cartTotalPrice: finalPriceRounded
      }
    });
  };

  const addItemToCart = (productToAdd) => {
    const matchingItemIndex = cartItems.findIndex((item) => item.id === productToAdd.id);

    if (matchingItemIndex === -1) {
      // item not yet in cart
      const updatedCartItems = [...cartItems, { ...productToAdd, quantity: 1 }];
      updateCartItemsReducer(updatedCartItems);
    } else {
      // item already in cart
      const updatedCartItems = cartItems.map((item) => {
        return item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item;
      });
      updateCartItemsReducer(updatedCartItems);
    }
  };

  const removeItemFromCart = (productToRemove) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productToRemove.id);
    updateCartItemsReducer(updatedCartItems);
  };

  const reduceItemQuantityInCart = (productToReduce) => {
    const quantityOfItem = productToReduce.quantity;
    console.log('quantityOfItem', quantityOfItem);

    const reduceQuantity = cartItems.map((item) => {
      return item.id === productToReduce.id ? { ...item, quantity: item.quantity - 1 } : item;
    });

    const removeItem = cartItems.filter((item) => item.id !== productToReduce.id);

    const updatedCartItems = quantityOfItem > 1 ? reduceQuantity : removeItem;
    updateCartItemsReducer(updatedCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    reduceItemQuantityInCart,
    cartItems,
    cartItemCount,
    cartTotalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
