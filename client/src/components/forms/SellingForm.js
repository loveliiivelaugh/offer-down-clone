import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlinedIcon';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from "../../hooks/useAuth.js";
import ImageLoader from './ImageLoader.js';

import Api from '../../api';


// const fileSelectedHandler = event => {
//   console.log(event.target.files[0]);
// }


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

const SellingForm = () => {
  const auth = useAuth();
  const classes = useStyles();
  const [pending, setPending] = useState()
  const [sellingData, setSellingData] = useState({
    name: '',
    description: '',
    price: '',
    picture: {},
    zip_code: '',
  });

  const { name, description, price, picture, zip_code } = sellingData;

  //function to update form data state upon form change
  const onChange = e => {
    if (e.target.name === "picture") {
      setSellingData({...sellingData, picture:e.target.files[0]});
    } else if (e.target.name !== "picture") {
      setSellingData({ ...sellingData, [e.target.name]: e.target.value })
    }
  };

  const handleSubmit = (data) => {
    setPending(true);

    console.log(data, 'data getting passed in the handler');

    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('picture', data.picture, data.picture.name);
    formData.append('price', data.price);
    formData.append('zip_code', data.zip_code);

    const { name, description, price, picture, zip_code } = data;
    
    Api.addProduct(data, auth.user);
    
    const clearValues = () => {
      setSellingData({
        name: '',
        description: '',
        price: '',
        picture: {},
        zip_code: '',
      });
    };
    clearValues();

    setPending(false);  
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sell an item
        </Typography>
        <form 
          className={classes.form}
          encType='multipart/form-data'
          noValidate
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(sellingData);
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            value={sellingData ? name : "name"}
            onChange={onChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            type="text"
            id="description"
            value={sellingData ? description : "description"}
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            type="number"
            value={sellingData ? price : "price"}
            onChange={onChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="picture"
            label="Picture"
            name="picture"
            type="file"
            onChange={onChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="zip_code"
            label="Zip Code"
            type="text"
            id="zip_code"
            value={sellingData ? zip_code : "zip_code"}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Post
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default SellingForm;
