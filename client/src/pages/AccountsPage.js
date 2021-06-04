import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, Card, CardContent, CardHeader, Divider, Drawer, List, Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ShareIcon from '@material-ui/icons/Share';
import { useRouter } from '../hooks/useRouter.js';
import CardSection from '../components/CardSection.js';
import Plaid from '../components/Plaid';
import ImageLoader from '../components/ImageLoader.js';


const AccountsPage = (props) => {
  const router = useRouter();
  const [title, setTitle] = React.useState("Purchase & Sales");

  const [section, setSection] = React.useState("purchases");

  const handleNav = {
    //use these function to change the components being rendered in the accounts section dynamically
    //todo --> Can turn this into child routes with react-router-dom
    purchases: () => {
      setTitle("Purchases & Sales");
    },
    banking: () => {
      setTitle("Payment & Deposit methods")
    },
    saves: () => {
      setTitle("Saved items")
    },
    settings: () => {
      setTitle("Account Settings")
    }
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography component="h1" variant="h4" align="left">
              Account
            </Typography>
          </CardContent>
          <CardContent>
          
            <Divider />
            <Typography component="h6" variant="h6" align="left">
              Transactions
            </Typography>
            <List>
              <ListItem button onClick={() => handleNav.purchases()}>
                <ListItemText primary="Purchases & Sales" />
              </ListItem>
              <ListItem button onClick={() => handleNav.banking()}>
                <ListItemText primary="Payment & Deposit methods" />
              </ListItem>
            </List>
            <Divider />
            <Typography component="h6" variant="h6" align="left">
              Saves
            </Typography>
            <List>
              <ListItem button onClick={() => handleNav.saves()}>
                <ListItemText primary="Saved items" />
              </ListItem>
              
              </List>
            <Divider />
            <Typography component="h6" variant="h6" align="left">
              Account
            </Typography>
            <List>
              <ListItem button onClick={() => handleNav.settings()}>
                <ListItemText primary="Account Settings" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="View public profile" />
                <ListItemIcon>
                  <ShareIcon />
                </ListItemIcon>
              </ListItem>
            </List>
          
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={9}>
        <Typography component="h1" variant="h4" align="left">
          {title}
        </Typography>
        <Card style={{height: '60vh'}}>
          <Tabs
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

          </Tabs>
          <Divider />
          <FormControl component="fieldset">
            <TextField type="text" name="balance" label="Balance" variant="outlined" />
            <TextField type="text" name="balance" label="$0.00" variant="outlined" />
          </FormControl>
          <Plaid />
          <ImageLoader />
          <CardSection />
        </Card>

      </Grid>
    </Grid>
  )
}

export default AccountsPage