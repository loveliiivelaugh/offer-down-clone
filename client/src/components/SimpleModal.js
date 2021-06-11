import React from 'react';
import SignIn from './forms/SignIn';
import SignUp from './forms/SignUp';
import AskForm from './forms/AskForm';
import SellingForm from './forms/SellingForm';
import PaymentForm from './forms/PaymentForm';
import { Avatar, Button, Modal, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CardSection from './forms/CardSection';
import CheckoutForm from './forms/CheckoutForm';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SimpleModal = ({ open, handleClose, type, setType }) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {
        type === "signin" ? <SignIn setType={setType} handleClose={handleClose} /> :
        type === "signup" ? <SignUp setType={setType} handleClose={handleClose} /> :
        type === "ask" ? <AskForm handleClose={handleClose} setType={setType} type={type} /> :
        type === "message" ? <AskForm handleClose={handleClose} setType={setType} type={type} /> :
        type === "sell" ? <SellingForm handleClose={handleClose} setType={setType} type={type} /> :
        type === "payment" ? ( 
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <PaymentForm className={classes.form} handleClose={handleClose} type={type} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save
            </Button>
          </div>
        ) :
        <SellingForm handleClose={handleClose} setType={setType} />
      }
    </Modal>
  );
}

export default SimpleModal
