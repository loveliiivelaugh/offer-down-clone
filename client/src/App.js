import React from 'react';
import Pages from './pages/router';
import './App.css';
import { ProvideAuth } from "./hooks/useAuth.js";
import MongoContextProvider from "./hooks/useMongoDb.js";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");


function App() {
  return (
    <ProvideAuth>
      <MongoContextProvider>
        <Elements stripe={stripePromise}>
          <Pages />
        </Elements>
      </MongoContextProvider>
    </ProvideAuth>
  );
}

export default App;