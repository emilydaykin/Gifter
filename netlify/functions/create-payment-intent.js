// --- Back end libraries that help us work with stripe --- //
// --- Old school JS --- //

// Set up
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Serverless function (req & res)
exports.handler = async (event) => {
  try {
    // Amount in cents
    const { amount } = JSON.parse(event.body);

    // Request to stripe server
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      payment_method_types: ['card']
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent })
    };
  } catch (error) {
    console.log({ error });

    return {
      status: 400,
      body: JSON.stringify({ error })
    };
  }
};
