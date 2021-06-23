import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import { MongoContext } from '../hooks/useMongoDb.js';



const Link = ({ linkToken, setAccountBalance }) => {
  const user = useContext(MongoContext);
  console.log(user);

  const handleOnSuccess = async (public_token, metadata) => {
    //send token to client server
    const { data } = await axios.post('/api/plaid/exchange_public_token', {
      public_token: public_token,
    });

    user.data.plaid_accessToken = data.token;
    console.log(user);
    const accountsData = await axios.get('/api/plaid/accounts/' + data.token);
    console.log(accountsData);

    setAccountBalance(accountsData.data.accounts[0].balances.available);
  };

  const handleOnExit = () => {
    //handle the case when your user exits Link
  };

  const handleClick = response => {
    // axios
    //   .get('/transactions')
    //   .then(res => setTransactions({ transactions: res }));
  };

  const config = {
    token: linkToken,
    onSuccess: handleOnSuccess,
    onExit: handleOnExit,
    onClick: handleClick
  };

  const { open, ready, error } = usePlaidLink(config);

  return (
    <Button onClick={() => open()} disabled={!ready}>
      {user.data.plaid_accessToken 
        ? "Disconnect your bank" 
        : "Connect a bank account"
      }
    </Button>
  );
}
export default Link;