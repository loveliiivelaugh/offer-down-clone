import React, { useContext } from 'react';
import { MongoContext } from '../hooks/useMongoDb.js';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function TransactionsSection(props) {
  const classes = useStyles();
  // const user = {
  //   name: 'Melanie',
  //   email: 'melanie@test.com',
  //   location: 'Chicago, IL',
  //   password: 'password123',
  //   balance: 10.75,
  //   purchased_items: {
  //     name: 'Hat',
  //     price: 4.25
  //   },
  //   sold_items: {
  //     name: 'Nintendo Switch',
  //     price: 150
  //   }
  // };

  const user = useContext(MongoContext);
  
    console.log(user);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Purchases
          </Typography>
          <div className={classes.demo}>
            <List>
              <ListItem>
                <Grid item xs={12} md={6}>
                  <ListItemText>
                    {/* if no purchases items, 'you have not purchased any items' */}
                    {/* {user.purchased_items.name} */}
                  </ListItemText>
                </Grid>
                <ListItemText>
                  {/* - ${user.purchased_items.price} */}
                </ListItemText>

              </ListItem>
            </List>
          </div>
          <Typography variant="h6" className={classes.title}>
            Sales
          </Typography>
          <div className={classes.demo}>
            <List>
              <ListItem>
                <Grid item xs={12} md={6}>
                  <ListItemText>
                    {/* {user.sold_items.name} */}
                  </ListItemText>
                </Grid>
                <ListItemText>
                  {/* + ${user.sold_items.price} */}
                </ListItemText>

              </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default TransactionsSection
