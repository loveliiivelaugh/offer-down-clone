import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, Card, CardContent, CardHeader, Divider, Drawer, List, Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import ShareIcon from '@material-ui/icons/Share';
import { fade, makeStyles } from '@material-ui/core/styles';

import CardSection from '../components/CardSection.js';
import Plaid from '../components/Plaid';
import ImageLoader from '../components/forms/ImageLoader.js';
import { useAuth } from '../hooks/useAuth.js';
import { useRouter } from '../hooks/useRouter.js';
import axios from 'axios';
import Api from '../api';


const useStyles = makeStyles((theme) => ({
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  }
}));


const AccountsPage = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const auth = useAuth();
  const [user, setUser] = useState({});
  const [pending, setPending] = useState(false);

  const fetchLoggedInUser = async () => {
    const userId = await auth.user.uid;
    const loggedInUser = await Api.getUser(userId);
    setUser(loggedInUser);
    setPending(false);
  };

  useEffect(() => {
    setPending(true);
    fetchLoggedInUser();
  }, []);

  const saved_items = user.data ? user.data[0].saved_items : [];

  console.log(user, "SavedItems []: ", saved_items);

  const [title, setTitle] = useState("Purchase & Sales");
  const [section, setSection] = useState("purchases");

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
  };

  const handleClick = (product) => {
    router.push({
      pathname: "/products/" + product.id,
      state: {
        product: product
      }
    });
  };

  const handleDelete = async (id) => {
    console.log("You are deleting me?!", id);
    const deletedItem = await Api.removeLikedItem(id);
    console.info(deletedItem);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>

      {/* SideNavCard.js */}
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
      {/* --- end --- SideNavCard.js */}


      </Grid>
      <Grid item xs={12} md={9}>
        <Typography component="h1" variant="h4" align="left">
          {title}
        </Typography>


{/* 
  Move this Card into its own component.
  Call it TransactionsSection.js 
*/}
        {/* 
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
          {auth &&
            <Plaid auth={auth} /> 
          }
          <ImageLoader />
          <CardSection />
        </Card> 
        */}

{/* 
  Move this Card into its own component.
  Call it LikedItemsSection.js
  
  !!! Also this component needs to be fixed up. Styling needs to be adjusted. Positioning of delete button adjusted.
  !!! clickHandler() is not passing in the correct data nor data structure. After investigating a little, for whatever
  !!! reason the data is not being passed correctly further up the tree. Needs to be fixed. handleDelete() is connected
  !!! to the server but the server route is broken.
*/}
        <Card style={{height: '60vh'}}>
          <CardContent>
            <List className={classes.list}>
              {saved_items.map(({ userId: _id, name, price, product_id }) => (
                <React.Fragment key={product_id}>
                  <ListItem button onClick={() => handleClick({ _id, name, price, product_id })}>
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" src="" />
                    </ListItemAvatar>
                    <ListItemText primary={name} />
                  </ListItem>
                  <Button onClick={() => handleDelete(product_id)} color="secondary">Delete</Button>
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>


      </Grid>
    </Grid>
  )
}

export default AccountsPage