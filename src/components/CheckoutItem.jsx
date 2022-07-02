import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';

const CheckoutItem = ({ checkoutItem }) => {
  return (
    <div className='checkout-item'>
      <div className='checkout-item__image-container'>
        <img className='checkout-item__image' src={checkoutItem.imageUrl} alt={checkoutItem.name} />
      </div>
      <div className='checkout-item__description'>{checkoutItem.name}</div>
      <div className='checkout-item__quantity'>
        <FontAwesomeIcon className='checkout-item__quantity-icon' icon={faCaretLeft} />
        &ensp;
        <span>{checkoutItem.quantity}</span>
        &ensp;
        <FontAwesomeIcon className='checkout-item__quantity-icon' icon={faCaretRight} />
      </div>
      <div className='checkout-item__price'>{checkoutItem.price}</div>
      <div className='checkout-item__remove'>&times;</div>
    </div>
  );
};

export default CheckoutItem;
