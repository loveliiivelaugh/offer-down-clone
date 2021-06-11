import React from 'react';
import { requireAuth } from '../hooks/useAuth.js';
import Checkout from '../components/Checkout';

const CheckoutPage = () => {
  return (
    <div>
      <Checkout />
    </div>
  )
}

export default requireAuth(CheckoutPage)
