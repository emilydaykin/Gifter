import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalPrice } from '../../store/cart/cart.selector';
import CheckoutItem from './CheckoutItem';
import Footer from '../Footer';

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotalPrice = useSelector(selectCartTotalPrice);

  const goToPayment = () => {
    console.log('"go to payment" clicked!');
    navigate('/payment');
  };

  return (
    <>
      <div className='checkout'>
        <div className='checkout__table'>
          <h1 className='checkout__table-heading'>Checkout</h1>
          <div className='checkout__heading-row'>
            <p className='checkout__heading checkout__heading--product'>Product</p>
            <p className='checkout__heading checkout__heading--description'>Description</p>

            <p className='checkout__heading checkout__heading--quantity'>Quanity</p>
            <p className='checkout__heading checkout__heading--price'>Price</p>
            <p className='checkout__heading checkout__heading--remove'>Remove</p>
          </div>
          {cartItems.map((item) => (
            <CheckoutItem key={item.id} checkoutItem={item} />
          ))}
          <div className='checkout__total'>
            Total: &euro;<span>{cartTotalPrice}</span>
          </div>
          <div className='checkout__payment-button-wrapper'>
            <button className='button button--payment' onClick={goToPayment}>
              Go To Payment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
