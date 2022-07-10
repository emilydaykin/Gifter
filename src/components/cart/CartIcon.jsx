import { useContext } from 'react';
import { ReactComponent as CartSvg } from '../../assets/shopping_bag.svg';

import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
  const { cartItemCount } = useContext(CartContext);

  return (
    <div className='cart-icon'>
      <CartSvg className='cart-icon__image' />
      <span className='cart-icon__item-count'>{cartItemCount}</span>
    </div>
  );
};

export default CartIcon;
