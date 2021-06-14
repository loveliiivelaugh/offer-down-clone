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
                    {user?.data?.purchased_items.name ? user.data.purchased_items.name : 'No purchased items to show'}
                  </ListItemText>
                </Grid>
                <ListItemText>
                {user?.data?.purchased_items.price ? user.data.purchased_items.price : ''}
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
                  {user?.data?.sold_items.name ? user.data.sold_items.name : 'You have not sold any items yet!'}
                  </ListItemText>
                </Grid>
                <ListItemText>
                {user?.data?.sold_items.price ? user.data.sold_items.price : ''}
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
