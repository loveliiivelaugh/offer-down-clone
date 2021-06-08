import React from 'react';
import { Avatar, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

{/* 
  !!! Also this component needs to be fixed up. Styling needs to be adjusted. Positioning of delete button adjusted.
  !!! clickHandler() is not passing in the correct data nor data structure. After investigating a little, for whatever
  !!! reason the data is not being passed correctly further up the tree. Needs to be fixed. handleDelete() is connected
  !!! to the server but the server route is broken.
*/}

const useStyles = makeStyles((theme) => ({
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  }
}));

const LikedItemsSection = ({ saved_items, handleClick, handleDelete }) => {
  const classes = useStyles();
  return (
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
  )
}

export default LikedItemsSection
