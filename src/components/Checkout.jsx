import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';

const Checkout = () => {
  const { cartItems, getCartTotalPrice } = useContext(CartContext);

  console.log('cartItems', cartItems);

  return (
    <>
      <div className='checkout'>
        <div className='checkout__table'>
          <div className='checkout__heading-row'>
            <p className='checkout__heading checkout__heading--product'>Product</p>
            <p className='checkout__heading checkout__heading--description'>Description</p>
            <p className='checkout__heading checkout__heading--quantity'>Quanity</p>
            <p className='checkout__heading checkout__heading--price'>Price (&euro;)</p>
            <p className='checkout__heading checkout__heading--remove'>Remove</p>
          </div>
          {cartItems.map((item) => (
            <div key={item.id} className='checkout__item'>
              <div className='checkout__item-image-container'>
                <img className='checkout__item-image' src={item.imageUrl} alt={item.name} />
              </div>
              <div className='checkout__item-description'>{item.name}</div>
              <div className='checkout__item-quantity'>
                <FontAwesomeIcon className='checkout__item-quantity-icon' icon={faCaretLeft} />
                &ensp;
                <span>{item.quantity}</span>
                &ensp;
                <FontAwesomeIcon className='checkout__item-quantity-icon' icon={faCaretRight} />
              </div>
              <div className='checkout__item-price'>{item.price}</div>
              <div className='checkout__item-remove'>&times;</div>
            </div>
          ))}
          <div className='checkout__total'>
            Total: &euro;<span>{getCartTotalPrice()}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
