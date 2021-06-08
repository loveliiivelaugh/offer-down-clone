import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useRouter } from '../hooks/useRouter.js';
import Api from '../api';
//components
import SideNavCard from '../components/SideNavCard';
import LikedItemsSection from '../components/LikedItemsSection';
import TransactionsSection from '../components/TransactionsSection';
import BankingSection from '../components/BankingSection';
import SettingsSection from '../components/SettingsSection';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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
  console.log(user)
  const [pending, setPending] = useState(false);
  const [section, setSection] = useState({
    type: "purchases",
    title: "Purchases & Sales",
  });

  const { type, title } = section;

  const fetchLoggedInUser = async () => {
    const userId = await auth.user.uid;
    console.log(userId)
    const loggedInUser = await Api.getUser(userId);

    console.log(loggedInUser);
    setUser(loggedInUser);
    setPending(false);
  };

  useEffect(() => {
    setPending(true);
    fetchLoggedInUser();
  }, []);

  // console.log(user.data)

  // const saved_items = !user.data ? [] : user.data[0].saved_items;
  const saved_items = [];

  console.log(user, "SavedItems []: ", saved_items);

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
    const deletedItem = await Api.removeLikedItem(id);
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
        {type === "purchases" && <TransactionsSection />}
        {type === "saves" && 
          <LikedItemsSection 
            saved_items={saved_items} 
            handleClick={handleClick} 
            handleDelete={handleDelete} 
          />
        }
        {type === "banking" && <BankingSection /> }
        {type === "settings" && <SettingsSection /> }
      </Grid>
    </Grid>
  )
}

export default AccountsPage