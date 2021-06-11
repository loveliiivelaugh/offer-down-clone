import React, { useState } from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import axios from 'axios';
import CardSection from './CardSection';
//MaterialUI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    // minHeight: 400
  },
  title: {
    fontSize: 14,
  },
});

const CheckoutForm = ({ toggleConfetti }) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const [savePayment, setSavePayment] = useState(false);

  console.log(stripe)

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    console.log("I am being submitted?");

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const email = event.target.email.value;

    const res = await axios.post('http://localhost:8080/api/stripe/pay', { email: email });
    console.log(res.data);
    const clientSecret = res.data.client_secret;

    const savedPayment = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: "Test Name"
      }
    });

    if (savedPayment) {
      console.log(savedPayment);
      setSavePayment(savedPayment);
    }

    const confirmedPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      }
    });

    if (confirmedPayment.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(confirmedPayment.error.message);
    } else {
      // The payment has been processed!
      if (confirmedPayment.paymentIntent.status === 'succeeded') {
        console.log(" Money in the bank! ");

        toggleConfetti(true);
        setTimeout(() => toggleConfetti(false), 15000);
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
  <Grid container spacing={3}>
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} md={12}>
            <Grid item xs={12} md={6}>
              <TextField required id="cardName" label="Name on card" autoComplete="cc-name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset">
                <TextField type="number" name="zip" label="Zip code" />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl component="fieldset">
              <TextField type="email" name="email" label="Enter your email" />
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={12}>
            <CardSection />
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={!stripe}>Save</Button>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveCard" value="yes" />}
              label="Remember credit card details for next time"
              />
          </Grid>
        </form>
      </CardContent>
    </Card>
  </Grid>
  );
}

export default CheckoutForm;