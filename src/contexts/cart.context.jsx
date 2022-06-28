import { createContext, useState } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {}
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    const matchingItemIndex = cartItems.findIndex((item) => item.id === productToAdd.id);

    if (matchingItemIndex === -1) {
      // item not yet in cart
      setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
    } else {
      // item already in cart
      setCartItems([...cartItems, cartItems[matchingItemIndex].quantity++]);
    }
  };

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};