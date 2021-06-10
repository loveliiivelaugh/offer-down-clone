import React from 'react';
import Pages from './pages/router';
import './App.css';
import { ProvideAuth } from "./hooks/useAuth.js";
import { ProvideUser } from "./utils/mongoDb.js";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);


function App() {
  return (
    <ProvideAuth>
      <ProvideUser>
        <Elements stripe={stripePromise}>
          <Pages />
        </Elements>
      </ProvideUser>
    </ProvideAuth>
  );
}

export default App;

// export default function App() {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
//       <CssBaseline/>
//       <Header/>
//     </div>
//   );
// }
