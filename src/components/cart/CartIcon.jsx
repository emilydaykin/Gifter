import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../../store/cart/cart.selector';
import { ReactComponent as CartSvg } from '../../assets/shopping_bag.svg';

const CartIcon = () => {
  const cartItemCount = useSelector(selectCartItemCount);

  return (
    <div className='cart-icon'>
      <CartSvg className='cart-icon__image' />
      <span className='cart-icon__item-count'>{cartItemCount}</span>
    </div>
  );
};

export default CartIcon;
