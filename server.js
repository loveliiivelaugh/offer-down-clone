//ExpressJS Hello World boilerplate server
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');//default test key


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())

app.use(cors());

app.use(express.static('public'));

if ( process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/");

app.get('/api/products', (req, res) => {
  axios.get("https://fakestoreapi.com/products")
    .then(data => {
      console.log(data.data);
      res.json(data.data);
    })
    .catch(error => {
      console.error(error);
      res.json({ error: error });
    });
});

//Stripe route to accept payments
//https://www.youtube.com/watch?v=JkSgXgqRH6k&t=582s
// YouTube video I used to guide me through basic setup
// Stripe official docs. vvv
//https://stripe.com/docs/payments/accept-a-payment?platform=web&lang=css&client=react&ui=elements
app.post('/pay', async (req, res) => {
  // Set your secret key. Remember to switch to your live secret key in production.
  // See your keys here: https://dashboard.stripe.com/apikeys
  console.log(req.body);
  const { email } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,//todo --> Need to update this to grab the price from the db within the server to maintain security.
    currency: 'usd',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
    receipt_email: email
  });

  console.log(paymentIntent.client_secret);
  res.json({ client_secret: paymentIntent.client_secret });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});