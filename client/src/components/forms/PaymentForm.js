import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckoutForm from './CheckoutForm';

function PaymentForm({ data, checkoutData, setCheckoutData }) {
  console.log(checkoutData)
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <CheckoutForm 
          toggleConfetti={null} 
          data={data}
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
        />
      </Grid>
    </Grid>
  );
}

export default PaymentForm;