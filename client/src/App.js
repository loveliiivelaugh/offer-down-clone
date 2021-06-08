import Pages from './pages/router';
import './App.css';

import { ProvideAuth } from "./hooks/useAuth.js";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/offerdownbackground.jpeg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));
function App() {
  return (
    <ProvideAuth>
      <Elements stripe={stripePromise}>
        <Pages />
      </Elements>
    </ProvideAuth>
  );
}

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <Header/>
    </div>
  );
}
