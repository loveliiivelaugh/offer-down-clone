import React, { useEffect, useState } from 'react';
import { useRouter } from '../hooks/useRouter.js';
import { useAuth } from '../hooks/useAuth.js';
import { useUser, updateUser } from '../utils/mongoDb.js';
import Api from '../api';
//components
import SimpleModal from '../components/SimpleModal';
//MaterialUI
import { 
  Avatar, Button, Card, CardActions, CardActionArea, CardContent, CardHeader, Container, Grid, IconButton, Typography
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';


const SingleProductPage = () => {
  const router = useRouter(); //useRouter hook -- refer to hooks directory
  const auth = useAuth(); //useAuth hook -- refer to hooks directory
  const product = router.location.state.product;

  // Fetch user data (hook) returns data, status, and error.
  const {
    data: user,
    status: userStatus,
    error: userError
  } = useUser(auth.user.uid); //pass in the uid from the currently logged in user

  //Modal
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("ask");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //end modal

  console.log(user, product);

  const handleOfferButton = (e) => {
    e.preventDefault();

    router.push('/checkout', {
      state: product
    });
  };

  const handleAskButton = (e) => {
    e.preventDefault();
    handleOpen();
  };

  const handleLikeButton = async (e) => {
    e.preventDefault();
    console.log("handleFavoritesButton", product);
    //this is where the database code goes
    await user.liked_items.push(product);
    return user;
  };

  return (
    <Container>
      <h1>I am a single product page!</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <img src={product.image} alt={product.title} style={{maxWidth: '100%'}} />
          <hr />
          <Grid item xs={12} md={12}>
            Additional image thumbnails go here.
            <Avatar variant="square">
              N
            </Avatar>
            <Avatar variant="square">
              <AssignmentIcon />
            </Avatar>
          </Grid>
          <hr />
          <Typography gutterBottom variant="h4" component="h2">
            Description
          </Typography>
          <Typography variant="body2" component="p">
            {product.description}
          </Typography>
          <hr />
          <Grid item xs={12} md={12}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} md={12}>
            Potentially a Google Map goes here.
          </Grid>
          <Grid item xs={12} md={12}>
            Thumbnails of similar items go here.
            <Avatar variant="square">
              N
            </Avatar>
            <Avatar variant="square">
              <AssignmentIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardActionArea>
              <CardHeader>
                <CardContent>
                  <Typography gutterBottom variant="h2" component="h2">
                    {product.title}
                    </Typography>
                  </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="h3" component="h2">
                    {product.price}
                  </Typography>
                </CardContent>
              </CardHeader>

              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Posted 2 minutes ago in San Bernardino, CA
                </Typography>
                <Typography variant="body2" component="p">
                  {product.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {product.category}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button 
                variant="contained" 
                fullWidth 
                color="primary" 
                onClick={e => handleOfferButton(e)}
              >
                Make offer
              </Button>
            </CardActions>
            <CardActions>
              <Button 
                variant="outlined"  
                fullWidth 
                color="primary" 
                onClick={e => handleAskButton(e)}
              >
                Ask
              </Button>
              <SimpleModal 
                open={open} 
                handleClose={handleClose} 
                type={type} 
                setType={setType} 
              />
            </CardActions>
            <CardActions>
              <IconButton aria-label="add to favorites" onClick={handleLikeButton}>
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SingleProductPage
