import React, { useEffect, useState, useContext } from 'react';
import { Button, Grid, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Api from '../../api';
import { MongoContext } from '../../hooks/useMongoDb.js';
import ClipLoader from "react-spinners/ClipLoader";


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const OfferForm = ({ handleClose, setType, type, product }) => {
  const classes = useStyles();
  const user = useContext(MongoContext);

  const [pending, setPending] = useState(false);
  const [offer, setOffer] = useState({});

  useEffect(() => {
    setOffer(product);
  }, []);

  const handleSubmit = async (event) => {
    // event.preventDefault();
    setPending(true);

    const sentOffer = await Api.submitOffer({ 
      sender: user, 
      recipient: product, 
      offer: offer 
    });

    setOffer(0);
    handleClose();
    setPending(false);

    return sentOffer;
  };

  const onChange = e => {
      setOffer({ ...offer, [e.target.name]: e.target.value });
    };
  
  return (
    <div className={classes.paper}>
      <Typography variant="h6" gutterBottom>
        Make an Offer
      </Typography>
      <Grid container spacing={3}>
        <form onSubmit={e => {
          e.preventDefault()
          handleSubmit(offer)
        }}>
          <Grid item xs={12} sm={12}>
            <label htmlFor="askMessage">New offer</label>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField 
              required 
              id="offer" 
              label="Make an Offer"
              name="amount"
              fullWidth 
              // value={offer}
              placeholder={offer}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
          {pending ? <ClipLoader loading={pending} /> : 
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={handleSubmit}
            >
              Send
            </Button>
          }
            <Button color="secondary" onClick={handleClose}>Cancel</Button>
          </Grid>
        </form>
      </Grid>
    </div>
  )
}

export default OfferForm
