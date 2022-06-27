import { useContext } from 'react';
import CartItem from './CartItem';
import { CartContext } from '../contexts/cart.context';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className='cart-dropdown'>
      <div className='cart-dropdown__cart-items'>
        {cartItems.length > 0 ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <p>No Items Yet</p>
        )}
      </div>
      <button
        className={
          cartItems.length > 0
            ? 'button cart-dropdown__button'
            : 'button cart-dropdown__button button--disallowed'
        }
      >
        Go to Checkout
      </button>
    </div>
  );
};

export default CartDropdown;
