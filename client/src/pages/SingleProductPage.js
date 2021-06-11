import React, { useState, useEffect } from 'react';
import { useRouter } from '../hooks/useRouter.js';
import { useAuth } from '../hooks/useAuth.js';
import Api from '../api';
//components
import SimpleModal from '../components/SimpleModal';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Button, Card, CardActions, CardActionArea, CardContent, CardHeader, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  
  productGrid: {
    marginBottom: 50,
    marginTop: 20
  },
  card: {
    marginTop: 15
  },
  image: {
    marginBottom: 15
  }
}));

const SingleProductPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const auth = useAuth();
  const product = router.location.state.product;
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const loggedInUser = await Api.getUser(await auth.user.uid);
      setUser(loggedInUser.data[0]);
    }

    fetchLoggedInUser();
  }, [auth]);
  //Modal
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("ask");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //end modal

  console.log(product);

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
    e.preventDefault()
    console.log("handleFavoritesButton", product);
    //this is where the database code goes

    //hit the likeItem method passing in the current users email, and the product id.
    // db.likeItem(auth.user.email, product.id);
    const newlyLikedItem = await Api.addLikedItem(user, product);
    console.log(newlyLikedItem);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9} className={classes.productGrid}>
          <img src={product.image} alt={product.title} style={{maxWidth: '100%'}} className={classes.image}/>
          <Typography gutterBottom variant="h4" component="h2">
            Description
          </Typography>
          <Typography variant="body2" component="p">
            {product.description} 
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
        <Box border={1} borderColor="primary.main" borderRadius="borderRadius" borderColor="primary.main" className={classes.card}><Card className={classes.card}>
            <CardActionArea>
              <CardHeader>
                <CardContent>
                  <Typography gutterBottom variant="h3" component="h2">
                    {product.price}
                  </Typography>
                </CardContent>
              </CardHeader>

              <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                    ${product.price}
                  </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Posted 2 minutes ago in {product.zip_code}
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
          </Card></Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SingleProductPage
