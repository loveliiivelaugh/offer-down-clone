// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const Link = () => {
  const [transactions, setTransactions] = useState([]);
  const [linkToken, setLinkToken] = useState(null);

  const generateToken = async () => {
    const response = await axios.post('/api/plaid/create_link_token');
    const data = await response.json();
    setLinkToken(data.link_token);
  };

  useEffect(() => {
    generateToken();
  }, []);

  const handleOnSuccess = (public_token, metadata) => {
    console.log(public_token, metadata);
    //send token to client server
    axios.post('/api/plaid/exchange_public_token', {
      public_token: public_token
    });
  };

  const handleOnExit = () => {
    //handle the case when your user exits Link
  };

  const handleClick = response => {
    axios
      .get('/transactions')
      .then(res => setTransactions({ transactions: res }));
  };

  // const config = {
  //   token: linkToken ? linkToken : null,
  //   onSuccess: handleOnSuccess,
  //   onExit: handleOnExit,
  //   onClick: handleClick
  //   // ...
  // };

  // const { open, ready, error } = usePlaidLink(config);

  return (
    <Button>
    {/* <Button onClick={() => open()} disabled={!ready}> */}
      Connect a bank account
    </Button>
  );
}
export default Link;