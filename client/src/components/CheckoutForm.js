import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import axios from 'axios';
import CardSection from './CardSection';
//MaterialUI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 400
  },
  title: {
    fontSize: 14,
  },
});

const CheckoutForm = ({ toggleConfetti }) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  console.log(stripe)

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    console.log("I am being submitted?")

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const email = event.target.email.value;

    const res = await axios.post('http://localhost:8080/pay', { email: email });
    console.log(res.data);
    const clientSecret = res.data.client_secret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
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
    <Card className={classes.root}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FormControl component="fieldset">
            <TextField type="email" name="email" label="Enter your email" variant="outlined" />
          </FormControl>
          <div>
            <CardSection />
          </div>
          <Button type="submit" variant="contained" color="primary" disabled={!stripe}>Confirm order</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default CheckoutForm;