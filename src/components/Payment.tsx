import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotalPrice } from '../store/cart/cart.selector';
import { selectCurrentUser } from '../store/user/user.selector';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Payment = () => {
  const stripe = useStripe(); // make requests to Stripe
  const elements = useElements();
  const totalAmount = parseFloat(useSelector(selectCartTotalPrice));
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // This function is synchronous
  const handlePayment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    // Payment Intent (Serverless function via Netlify)
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Amount in cents
      body: JSON.stringify({ amount: totalAmount * 100 })
    }).then((res) => res.json());

    const clientSecret = response.paymentIntent.client_secret;

    const cardDetails = elements.getElement(CardElement);
    if (cardDetails === null) return;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest'
        }
      }
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else if (paymentResult.paymentIntent.status === 'succeeded') {
      alert('Payment Successful!');
    } else {
      alert('unknown result');
    }
  };

  return (
    <div className='payment'>
      <h1 className='payment__heading'>Payment Details</h1>
      <div className='payment__instructions'>
        <p className='payment__instructions-heading'>
          --- Please use this test card for payments ---
        </p>
        <div className='payment__details'>
          <div className='payment__details-left'>
            <p>Card Number:</p>
            <p>MM/YY:</p>
            <p>CVC:</p>
            <p>ZIP:</p>
          </div>
          <div className='payment__details-right'>
            <p>4242 4242 4242 4242</p>
            <p>04/24 (any future date)</p>
            <p>242</p>
            <p>42424</p>
          </div>
        </div>
      </div>
      <form className='payment__form' onSubmit={handlePayment}>
        <CardElement />
        <button disabled={isProcessingPayment} className='button payment__button'>
          {isProcessingPayment ? <div className='loader-small'></div> : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default Payment;
