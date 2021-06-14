const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');//default test key
//Stripe route to accept payments
//https://www.youtube.com/watch?v=JkSgXgqRH6k&t=582s
// YouTube video I used to guide me through basic setup
// Stripe official docs. vvv
//https://stripe.com/docs/payments/accept-a-payment?platform=web&lang=css&client=react&ui=elements
router.post('/pay', async (req, res) => {
  // Set your secret key. Remember to switch to your live secret key in production.
  // See your keys here: https://dashboard.stripe.com/apikeys
  const { email } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,//todo --> Need to update this to grab the price from the db within the server to maintain security.
    currency: 'usd',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
    receipt_email: email
  });

  res.json({ client_secret: paymentIntent.client_secret });
});


module.exports = router;