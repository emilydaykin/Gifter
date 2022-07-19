import { createSelector } from 'reselect';
import { CartState } from './cart.reducer';
import { RootState } from '../store';

// Get Cart
const selectCartReducer = (state: RootState): CartState => state.cart;

// Get Cart Items
export const selectCartItems = createSelector([selectCartReducer], (cart) => cart.cartItems);

// Get isCartOpen boolean
export const selectIsCartOpen = createSelector([selectCartReducer], (cart) => cart.isCartOpen);

// Get Cart Item Count:
export const selectCartItemCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((prev, curr) => prev + curr.quantity, 0)
);

// Get Cart Total Price:
export const selectCartTotalPrice = createSelector([selectCartItems], (cartItems) => {
  const finalPrice = cartItems.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);

  const finalPriceRounded = finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 });

  return finalPriceRounded;
});
