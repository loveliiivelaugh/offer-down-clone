import React, { useContext, useEffect, useState } from 'react';
import { MongoContext } from '../hooks/useMongoDb.js';
import { requireAuth } from '../hooks/useAuth.js';
import { useRouter } from '../hooks/useRouter.js';
import axios from 'axios';
import Api from '../api';
//components
import AccountSettings from '../components/AccountSettings';
import PaymentSettings from '../components/PaymentSettings';
import SideNavCard from '../components/SideNavCard';
import SavedItems from '../components/SavedItems';
import TransactionsSection from '../components/TransactionsSection';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
// import ProfilePage from './ProfilePage';


const AccountsPage = (props) => {
  const user = useContext(MongoContext);
  const router = useRouter();
  const [section, setSection] = useState({
    type: "purchases",
    title: "Purchases & Sales",
  });

  const { type, title } = section;

  //Plaid
  const [linkToken, setLinkToken] = useState(null);

  const generateToken = async (id) => {
    const { data } = await axios.post('/api/plaid/create_link_token', id);
    setLinkToken(data.link_token);
  };

  useEffect(() => {
    if (user.status === "success") {
      generateToken(user.data.firebase_uid);
    }
  }, [user.status]);
  //End Plaid

  //Saved Items stuff
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const fetch = async (id) => {
      const saved = await Api.getUserSavedProd(id);

      setSavedItems(saved.data);
    }
    // setSavedItems(user.data.saved_items);
    fetch(user.data._id);
  },[]);

  // end saved items

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

  const handleDelete = async (user_id, id) => {
    const update = await Api.removeLikedItem(user_id, id);
    console.log(update, 'what am i here?');
    setSavedItems(update.data.saved_items);
    return;
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
            {type === "banking" && <PaymentSettings linkToken={linkToken} />}
            {type === "saves" &&
              <SavedItems
                user={user}
                savedItems={savedItems}
                handleClick={handleClick}
                handleDelete={handleDelete}
              />
            }
            {type === "settings" && <AccountSettings user={user} />}
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  );
}

//https://usehooks.com/useRequireAuth/
export default requireAuth(AccountsPage);