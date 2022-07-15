import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotalPrice } from '../store/cart/cart.selector';
import { selectCurrentUser } from '../store/user/user.selector';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Payment = () => {
  const stripe = useStripe(); // make requests to Stripe
  const elements = useElements();
  const totalAmount = useSelector(selectCartTotalPrice);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // This function is synchronous
  const handlePayment = async (event) => {
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

    // console.log('response', response);
    const clientSecret = response.paymentIntent.client_secret;
    // console.log('clientSecret', clientSecret);
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
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
      <h1>Payment Form</h1>
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
