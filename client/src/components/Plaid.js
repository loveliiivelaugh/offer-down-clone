// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const Link = () => {
  const [transactions, setTransactions] = React.useState([]);

  const handleOnSuccess = (public_token, metadata) => {
    console.log(public_token);
    //send token to client server
    axios.post('/auth/public_token', {
      pblic_token: public_token
    });
  };

  const handleOnExit = () => {
    //handle the case when your user exits Link
  }

  const handleClick = response => {
    axios
      .get('/transactions')
      .then(res => setTransactions({ transactions: res }));
  };

  return (
    <>
      <PlaidLink
        clientNme="React Plaid Setup"
        env="sandbox"
        product={["auth", "transactions"]}
        publicKey=""
        onExit={handleOnExit}
        onSuccess={handleOnSuccess}
      >
        Open Link and connect your bank!
      </PlaidLink>
      <div>
        <Button onClick={handleClick} >Get Transactions</Button>
      </div>
    </>
  )
}
export default Link;