import { useContext } from 'react';
import CartItem from './CartItem';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
  const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const toToCheckout = () => {
    navigate('/checkout');
    setIsCartOpen(!isCartOpen);
  };

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
        onClick={toToCheckout}
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
