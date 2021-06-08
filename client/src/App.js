import Pages from './pages/router';
import './App.css';

import { ProvideAuth } from "./hooks/useAuth.js";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import "dotenv";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_KEY);


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
