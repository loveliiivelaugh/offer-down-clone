import React, { useContext } from 'react';
import { MongoContext } from '../hooks/useMongoDb.js';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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

function SavedItems({ handleClick, handleDelete }) {

  const classes = useStyles();
  const user = useContext(MongoContext);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Saved Items
          </Typography>
          <div className={classes.demo}>
            <List>
              {user.data.saved_items.map(item => {
                return (
                <ListItem>
                <Grid item xs={12} md={6}>
                  <ListItemText>
                    {item.name}
                  </ListItemText>
                </Grid>
                <ListItemText>
                  ${item.price}
                </ListItemText>
              </ListItem>
              )})}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SavedItems;
