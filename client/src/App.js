import React from 'react';
import Pages from './pages/router';
import './App.css';
import { ProvideAuth } from "./hooks/useAuth.js";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from './components/Header';
import BuyandSell from './components/BuyandSell';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);


function App() {
  return (
    <ProvideAuth>
      <Elements stripe={stripePromise}>
        <Pages />
      </Elements>
    </ProvideAuth>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/offerdownbackground.jpeg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));
export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <BuyandSell />
    </div>
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
