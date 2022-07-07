import { createContext, useState } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  reduceItemQuantityInCart: () => {},
  getCartItemCount: () => {},
  getCartTotalPrice: () => {}
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

  const getCartItemCount = () => {
    return cartItems.reduce((prev, curr) => prev + curr.quantity, 0);
  };

  const getCartTotalPrice = () => {
    const total = cartItems.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
    // currency rounding:
    return total % 1 > 0 ? total.toFixed(2) : total;
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    reduceItemQuantityInCart,
    cartItems,
    getCartItemCount,
    getCartTotalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
