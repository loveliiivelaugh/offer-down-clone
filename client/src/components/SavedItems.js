import React, { useContext } from 'react';
import { MongoContext } from '../hooks/useMongoDb.js';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Button} from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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


  const user = useContext(MongoContext);
function SavedItems({ user, savedItems, handleClick, handleDelete }) {

  const classes = useStyles();
  // const user = {
  //     name: 'Melanie',
  //     email: 'melanie@test.com',
  //     location: 'Chicago, IL',
  //     password: 'password123',
  //     saved_items: {
  //       name: 'Shirt',
  //       price: 15
  //     }

  // }
  console.log(user, savedItems, 'in the saved items')


  return (
    <div className={classes.root}>
      {/* <Grid container spacing={2}>
        <Grid item xs={12} md={6}> */}
          <Typography variant="h6" className={classes.title}>
            Saved Items
          </Typography>
          <div className={classes.demo}>
            <List>
              {savedItems.length > 0 && savedItems.map(item => (
                <React.Fragment key={item._id}>
                  <ListItem>
                    <ListItemText primary={item.name} />
                    <ListItemText primary={item.description} />
                    <ListItemText primary={`$${item.price}`} />
                    <Button onClick={() => handleDelete(user.data._id, item._id)} color='secondary'>Remove</Button>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </div>
        {/* </Grid>
      </Grid> */}
    </div>
  );
}

export default SavedItems;
