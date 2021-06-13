import React, { useContext, useState } from 'react';
import { MongoContext } from '../hooks/useMongoDb';
import { useRouter } from '../hooks/useRouter.js';
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


const SingleProductPage = () => {
  const router = useRouter();
  const product = router.location.state.product;
  const user = useContext(MongoContext);
  console.log(user)

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
                product={product}
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
