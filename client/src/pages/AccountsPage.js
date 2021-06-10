import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useRouter } from '../hooks/useRouter.js';
// import { useUser, deleteItem } from '../utils/mongoDb.js';
import Api from '../api';
import AccountSettings from '../components/AccountSettings';
import PaymentSettings from '../components/PaymentSettings';
//components
import SideNavCard from '../components/SideNavCard';
import LikedItemsSection from '../components/LikedItemsSection';
import TransactionsSection from '../components/TransactionsSection';
import BankingSection from '../components/BankingSection';
import SettingsSection from '../components/SettingsSection';
import { Avatar, Card, CardContent, Divider, List, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfilePage from './ProfilePage';

//How is Michael keeping tracking of whos accessing these pages?
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
  const [user, setUser] = useState({}); //OLD WAY
  console.log(auth, user)
  const [pending, setPending] = useState(false);
  const [section, setSection] = useState({
    type: "purchases",
    title: "Purchases & Sales",
  });

  const { type, title } = section;

  // //NEW WAY
  // // Fetch user data (hook) returns data, status, and error.
  // const {
  //   data: user,
  //   status: userStatus,
  //   error: userError
  // } = useUser(auth.user.uid); //pass in the uid from the currently logged in user

  // console.log(user);

  // userStatus === "loading" ||
  // userStatus === "error"
  //   ? setPending(true)
  //   : setPending(false);

  // OLD WAY
  const fetchLoggedInUser = async () => {
    const loggedInUser = await Api.getUser(await auth.user.uid);
    console.log(loggedInUser);
    setUser(loggedInUser.data[0]);
    setPending(false);
  };

  useEffect(() => {
    setPending(true);
    fetchLoggedInUser();
  }, [auth]);

  console.log(user);

  // const saved_items = !user.data ? [] : user.data[0].saved_items;
  const saved_items = [];


  const handleNav = {
    //use these function to change the components being rendered in the accounts section dynamically
    //todo --> Can turn this into child routes with react-router-dom
    purchases: () => {
      setSection({ ...section, title: "Purchases & Sales", type: "purchases" });
    },
    banking: () => {
      setSection({ ...section, title: "Payment & Deposit methods", type: "banking" });
    },
    saves: () => {
      setSection({ ...section, title: "Saved items", type: "saves" });
    },
    settings: () => {
      setSection({ ...section, title: "Account Settings", type: "settings" });
    },
  };

  const handleClick = (product) => {
    router.push({
      pathname: "/products/" + product.id,
      state: {
        product: product
      }
    });
  };

  //OLD WAY
  const handleDelete = async (id) => {
    const deletedItem = await Api.removeLikedItem(id);

    console.log(deletedItem);
  };

  return (
    <Grid container spacing={3}>

      <Grid item xs={12} md={3}>
        <SideNavCard handleNav={handleNav} />
      </Grid>

      <Grid item xs={12} md={9}>

        <Typography component="h1" variant="h4" align="left">
          {title}
        </Typography>

        
        <Card style={{ height: '60vh' }}>
          <CardContent>
            {type === "purchases" && <TransactionsSection />}
            {type === "saves" &&
              <LikedItemsSection
                saved_items={user}
                handleClick={handleClick}
                handleDelete={handleDelete}
              />
            }
            {type === "banking" && <PaymentSettings user={user} />}
            {type === "settings" && <AccountSettings user={user} />}
          </CardContent>
        </Card>
{/* 
        <Card style={{height: '60vh'}}>
          <CardContent>
            <AccountSettings user={user} pizza='pizza'/>
          </CardContent>
        </Card>

        <Card style={{height: '60vh'}}>
          <CardContent>
            <PaymentSettings user={user} />
          </CardContent>
        </Card>
 */}

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
  Call it SavedItems.js
  
  !!! Also this component needs to be fixed up. Styling needs to be adjusted. Positioning of delete button adjusted.
  !!! clickHandler() is not passing in the correct data nor data structure. After investigating a little, for whatever
  !!! reason the data is not being passed correctly further up the tree. Needs to be fixed. handleDelete() is connected
  !!! to the server but the server route is broken.
*/}
        {/* <Card style={{height: '60vh'}}>
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
        </Card> */}

      </Grid>
    </Grid>
  );
}

export default AccountsPage;