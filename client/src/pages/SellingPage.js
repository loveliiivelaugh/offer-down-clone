import React, { useEffect, useState, useContext } from 'react';
import { 
  Avatar, Button, Card, CardContent, CardHeader, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography 
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/core/styles';
import SimpleModal from '../components/SimpleModal';
import { useAuth, requireAuth } from '../hooks/useAuth.js';
import { MongoContext } from '../hooks/useMongoDb.js';
import Api from '../api';
//spinner --> https://www.npmjs.com/package/react-spinners
import ClipLoader from "react-spinners/ClipLoader";



const useStyles = makeStyles((theme) => ({
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  }
}));

const SellingPage = () => {
  const auth = useAuth();
  const classes = useStyles();
  const [pending, setPending] = useState(false);
  
  const user = useContext(MongoContext);

  console.log(user);

  //Modal
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("sell");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //end modal

  const handleDelete = async (id) => {
    const deletedItem = await Api.removeListedItem(id, user._id);
    console.info(deletedItem);
  };

  return (
    <Container className="container center">
      
      <Typography variant="h3" gutterBottom>Selling</Typography>
  
      <center>
        <NotificationsIcon />
        <Typography variant="h4" gutterBottom>Start making money</Typography>
        <Typography variant="p" gutterBottom>To post items for sale, click the button.</Typography>
        
        <Button color="primary" variant="contained" onClick={handleOpen}>
          Post an item
        </Button>
      </center>

      <Grid container spacing={3}>
        <Grid item sm={12} md={12}>
          <Card style={{height: '60vh'}}>
            <CardContent>
              <List className={classes.list}>
                {/* {pending ? <ClipLoader /> :
                  !pending && 
                  user.data.posted_items && 
                  user.data.posted_items.map(({ name, image, price, _id }) => (
                  <React.Fragment key={_id}>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar alt="Profile Picture" src={image} />
                      </ListItemAvatar>
                      <ListItemText primary={name} />
                    </ListItem>
                    <Button onClick={() => handleDelete(_id)} color="secondary">Delete</Button>
                  </React.Fragment>
                ))} */}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <SimpleModal 
        open={open} 
        handleClose={handleClose}
        type={type} 
        setType={setType}
      />
    </Container>
  )
}

export default requireAuth(SellingPage);
