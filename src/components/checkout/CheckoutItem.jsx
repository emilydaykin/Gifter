import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';

const CheckoutItem = ({ checkoutItem }) => {
  const { addItemToCart, removeItemFromCart, reduceItemQuantityInCart } = useContext(CartContext);

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
            onClick={() => reduceItemQuantityInCart(checkoutItem)}
          />
          &nbsp;
          <span className='checkout-item__quantity-value'>{checkoutItem.quantity}</span>
          &nbsp;
          <FontAwesomeIcon
            className='checkout-item__quantity-icon'
            icon={faCaretRight}
            onClick={() => addItemToCart(checkoutItem)}
          />
        </div>
        <div className='checkout-item__price'>&euro;{checkoutItem.price.toFixed(2)}</div>
        <div className='checkout-item__remove' onClick={() => removeItemFromCart(checkoutItem)}>
          <span>&times;</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
