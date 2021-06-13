// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import { Button } from '@material-ui/core';
import React from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';


const Link = ({ linkToken }) => {
  // const [transactions, setTransactions] = useState([]);

  const handleOnSuccess = async (public_token, metadata) => {
    //send token to client server
    await axios.post('/api/plaid/exchange_public_token', {
      public_token: public_token,
    });
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
      Connect a bank account
    </Button>
  );
}
export default Link;