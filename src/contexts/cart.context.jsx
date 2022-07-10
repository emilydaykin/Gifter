import { createContext, useState, useReducer, useEffect } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  reduceItemQuantityInCart: () => {},
  // getCartItemCount: () => {},
  cartItemCount: 0,
  // getCartTotalPrice: () => {}
  cartTotalPrice: 0
});

// export const CART_ACTION_TYPES = {
//   SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
//   ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
//   REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
//   REDUCE_ITEM_QUANTITY_IN_CART: 'REDUCE_ITEM_QUANTITY_IN_CART',
//   GET_ITEM_CART_COUNT: 'GET_ITEM_CART_COUNT',
//   GET_CART_TOTAL_PRICES: 'GET_CART_TOTAL_PRICES'
// };

// const cartReducer = (state, action) => {
//   console.log('dispatched (cart)~');
//   console.log('action (cart):', action);
//   const { type, payload } = action;

//   switch (type) {
//     case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//       return {
//         ...state,
//         isCartOpen: payload
//       };
//     case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
//       return {
//         ...state
//       };
//     default:
//       throw new Error(`Unknown type '${type}' in the CartReducer`);
//   }
// };

// const INITIAL_STATE = {
//   isCartOpen: false,
//   cartItems: []
// };

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  const addItemToCart = (productToAdd) => {
    const matchingItemIndex = cartItems.findIndex((item) => item.id === productToAdd.id);

    if (matchingItemIndex === -1) {
      // item not yet in cart
      setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
    } else {
      // item already in cart
      const updatedCartItems = cartItems.map((item) => {
        return item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item;
      });
      setCartItems(updatedCartItems);
    }
  };

  const removeItemFromCart = (productToRemove) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productToRemove.id);
    setCartItems(updatedCartItems);
  };

  const reduceItemQuantityInCart = (productToReduce) => {
    const quantityOfItem = productToReduce.quantity;
    console.log('quantityOfItem', quantityOfItem);

    const reduceQuantity = cartItems.map((item) => {
      return item.id === productToReduce.id ? { ...item, quantity: item.quantity - 1 } : item;
    });

    const removeItem = cartItems.filter((item) => item.id !== productToReduce.id);

    setCartItems(quantityOfItem > 1 ? reduceQuantity : removeItem);
  };

  useEffect(() => {
    const updatedItemCount = cartItems.reduce((prev, curr) => prev + curr.quantity, 0);
    setCartItemCount(updatedItemCount);
  }, [cartItems]);

  useEffect(() => {
    const finalPrice = cartItems.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
    const finalPriceRounded = finalPrice % 1 > 0 ? finalPrice.toFixed(2) : finalPrice;
    setCartTotalPrice(finalPriceRounded);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    reduceItemQuantityInCart,
    cartItems,
    // getCartItemCount,
    // getCartTotalPrice
    cartItemCount,
    cartTotalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
