import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { PromiseProvider } from 'mongoose';
import Button from '@material-ui/core/Button';

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

{/* 
  !!! Also this component needs to be fixed up. Styling needs to be adjusted. Positioning of delete button adjusted.
  !!! clickHandler() is not passing in the correct data nor data structure. After investigating a little, for whatever
  !!! reason the data is not being passed correctly further up the tree. Needs to be fixed. handleDelete() is connected
  !!! to the server but the server route is broken.
*/}


function SavedItems({ handleClick, handleDelete }) {

  const classes = useStyles();
  const user = {
      name: 'Melanie',
      email: 'melanie@test.com',
      location: 'Chicago, IL',
      password: 'password123',
      saved_items: {
        name: 'Shirt',
        price: 15
      }

  }
 
  return (
    <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Saved Items
            </Typography>
                    <div className={classes.demo}>
                    {/* {saved_items.map(({ userId: _id, name, price, product_id }) => () */}
                    <List>
              <ListItem>
                <Grid item xs={12} md={6}>
                  <ListItemText>
                    {user.saved_items.name}
                  </ListItemText>
                </Grid>
                <ListItemText>
                  ${user.saved_items.price}
                </ListItemText>

              </ListItem>
            </List>
                    </div>
                </Grid>
            </Grid>
        </div>
  );
}

export default SavedItems;
