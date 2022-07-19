import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItemToCart,
  removeItemFromCart,
  reduceItemQuantityInCart
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../../store/cart/cart.types';

type CheckoutItemProps = {
  checkoutItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ checkoutItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  return (
    <div className='checkout-item'>
      <div className='checkout-item__left'>
        <div className='checkout-item__image-container'>
          <img
            className='checkout-item__image'
            src={checkoutItem.imageUrl}
            alt={checkoutItem.name}
          />
        </div>
        <div className='checkout-item__description'>{checkoutItem.name}</div>
      </div>
      <div className='checkout-item__right'>
        <div className='checkout-item__quantity'>
          <FontAwesomeIcon
            className='checkout-item__quantity-icon'
            icon={faCaretLeft}
            onClick={() => dispatch(reduceItemQuantityInCart(cartItems, checkoutItem))}
          />
          &nbsp;
          <span className='checkout-item__quantity-value'>{checkoutItem.quantity}</span>
          &nbsp;
          <FontAwesomeIcon
            className='checkout-item__quantity-icon'
            icon={faCaretRight}
            onClick={() => dispatch(addItemToCart(cartItems, checkoutItem))}
          />
        </div>
        <div className='checkout-item__price'>
          &euro;{checkoutItem.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
        <div
          className='checkout-item__remove'
          onClick={() => dispatch(removeItemFromCart(cartItems, checkoutItem))}
        >
          <span>&times;</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
