import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
const Payment = () => {
  const stripe = useStripe(); // make requests to Stripe
  const elements = useElements();

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    // Payment Intent (Serverless function via Netlify)
  };

  return (
    <div className='payment'>
      <h1>Payment Form</h1>
      <div className='payment__form'>
        <CardElement />
      </div>
    </div>
  );
};

export default Payment;
