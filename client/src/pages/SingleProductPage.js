import React, { useContext, useState } from 'react';
import { MongoContext } from '../hooks/useMongoDb';
import { useRouter } from '../hooks/useRouter.js';
import Api from '../api';
//components
import SimpleModal from '../components/SimpleModal';
//MaterialUI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Button, Card, CardActions, CardActionArea, CardContent, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
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
  const product = router.location.state.product;
  const user = useContext(MongoContext);

  //Modal
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("ask");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //end modal

  const handleOfferButton = (e) => {
    e.preventDefault();
    setType("offer");
    handleOpen();
  };

  const handleAskButton = (e) => {
    e.preventDefault();
    handleOpen();
  };

  const handleLikeButton = async (e) => {
    e.preventDefault();
    return await Api.addLikedItem(user, product);
  };

  return (
    <Container>

      <Grid container spacing={3}>

        <Grid item xs={12} md={9} className={classes.productGrid}>

          <h1>{product.name}</h1>

          <Grid item xs={12} md={9}>
            <img src={product.image} alt={product.title} style={{maxWidth: '100%'}} className={classes.image}/>
          
            <Typography gutterBottom variant="h6" component="h2">

              Description
            </Typography>
            <hr />
            <Typography variant="body2" component="p">
              {product.description} 
            </Typography>

          </Grid>
        </Grid> 


        <Grid item xs={12} md={3}>
        <Box border={1} borderRadius="borderRadius" borderColor="primary.main" className={classes.card}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                    ${product.price}
                  </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Posted from {product.zip_code}
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
                product={product}
              />
            </CardActions>
            <CardActions>
              <IconButton aria-label="add to favorites" onClick={handleLikeButton}>
                <FavoriteIcon />
              </IconButton>
            </CardActions>

          </Card>
          
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SingleProductPage
