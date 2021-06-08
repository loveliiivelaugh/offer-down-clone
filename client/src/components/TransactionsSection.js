import React from 'react';
import { Card, Divider, FormControl, Tab, Tabs, TextField } from '@material-ui/core';
import Plaid from './Plaid';
import ImageLoader from './forms/ImageLoader';
import CardSection from './CardSection';
import { useAuth } from '../hooks/useAuth.js';

const TransactionsSection = (props) => {
  const auth = useAuth();
  return (
    <Card style={{height: '60vh'}}>
      {/* <Tabs
        value={props.activeKey}
        indicatorColor="primary"
        textColor="primary"
        centered={false}
      >
        <Tab
          label="Accounts"
          value="general"
          // component={Link}
          // to="/settings/general"
        ></Tab>

        <Tab
          label="Transactions"
          value="password"
          // component={Link}
          // to="/settings/password"
        ></Tab>

      </Tabs> */}
      <Divider />
      <FormControl component="fieldset">
        <TextField type="text" name="balance" label="Balance" variant="outlined" />
        <TextField type="text" name="balance" label="$0.00" variant="outlined" />
      </FormControl>
      {auth &&
      ""
        // <Plaid auth={auth} /> //uncomment when server is finished
      }
      <ImageLoader />
      <CardSection />
    </Card> 
  )
}

export default TransactionsSection
