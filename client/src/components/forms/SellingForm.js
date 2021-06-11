import React, { useContext, useEffect, useState } from 'react';
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
import firebase from "../../utils/firebase";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';
import Api from '../../api';
import { MongoContext } from '../../hooks/useMongoDb.js';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  closeBtn: {
    float: 'right'
  }
}));

const SellingForm = ({ handleClose }) => {
  const auth = useAuth();
  const classes = useStyles();
  const user = useContext(MongoContext);
  const [pending, setPending] = useState(false);

  console.log(user)
  const [sellingData, setSellingData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    zip_code: '',
  });

  const { name, description, price, image, zip_code } = sellingData;

  //function to update form data state upon form change
  const onChange = e => {
    if (e.target.name === "image") {
      setSellingData({...sellingData, image:e.target.files[0]});
    } else if (e.target.name !== "image") {
      setSellingData({ ...sellingData, [e.target.name]: e.target.value })
    }
  };

  const handleSubmit = async (data) => {
    setPending(true);

    console.log(data, 'data getting passed in the handler');

    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child('images/' + data.image.name);
    await imageRef.put(data.image).then( async (snapshot) => {
      
      await snapshot.ref.getDownloadURL().then((url)=> {
        data.image = url;
      })
    });

    console.log(data, 'modified data project');
    console.log(auth);


    Api.addProduct({ product: data, user: user.data._id });
    
    const clearValues = () => {
      setSellingData({
        name: '',
        description: '',
        price: '',
        image: {},
        zip_code: '',
      });
    };
    clearValues();

    handleClose();

    setPending(false);  
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sell an item
        </Typography>
        <Button
            type="submit"
            variant="outlined"
            color="secondary"
            className={classes.close}
            onClick={handleClose}
          >
            X
          </Button>
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
            id="image"
            label="Picture"
            name="image"
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
