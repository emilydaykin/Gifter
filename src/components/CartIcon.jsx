import { ReactComponent as CartSvg } from '../assets/shopping_bag.svg';

const CartIcon = () => {
  return (
    <div className='cart-icon'>
      <CartSvg className='cart-icon__image' />
      <span className='cart-icon__item-count'>0</span>
    </div>
  );
};

export default CartIcon;
