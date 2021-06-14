import React, { useState, useEffect } from 'react';
import { requireAuth } from '../hooks/useAuth.js';
import { useRouter } from '../hooks/useRouter.js';
import Checkout from '../components/Checkout';
import Api from '../api';

const CheckoutPage = () => {
  const router = useRouter();
  const [state, setState] = useState({
    sender: {},
    recipient: {},
    product: {}
  })
  const { sender_id, recipient, product } = router.location.state;
  const [checkoutData, setCheckoutData] = useState({})

  console.log(router.location.state);

  useEffect(() => {
    const fetchData = async () => {
      const sender = await Api.getUser(sender_id)

      console.log(sender)

      setState({
        sender: sender,
        recipient: recipient,
        product: product
      })
    }

    fetchData();
  }, []);

  console.log(state);
  
  return (
    <div>
      <Checkout 
        data={state} 
        checkoutData={checkoutData} 
        setCheckoutData={setCheckoutData} 
      />
    </div>
  )
}

export default requireAuth(CheckoutPage)
