import Pages from './pages/router';
import './App.css';

import { ProvideAuth } from "./hooks/useAuth.js";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const useStyles = makeStyles((theme) => ({}));
export default function App() {
  const classes = useStyles();
  return (
    <div>
      <h1>OfferDown</h1>
    </div>
  );
}

function App() {
  return (
    <ProvideAuth>
      <Elements stripe={stripePromise}>
        <Pages />
      </Elements>
    </ProvideAuth>
  );
}

export default App;
