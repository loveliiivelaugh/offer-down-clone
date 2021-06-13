import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from "../../hooks/useAuth.js";
import ClipLoader from "react-spinners/ClipLoader";

import Api from '../../api';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

const SignUp = ({ handleClose, setType }) => {
  const auth = useAuth();
  const classes = useStyles();
  const [pending, setPending] = React.useState()
  const [authData, setAuthData] = React.useState({
    first: '',
    last: '',
    email: '',
    password: ''
  });

  const { first, last, email, password } = authData;

  //function to update form data state upon form change
  const onChange = e => (
    setAuthData({ ...authData, [e.target.name]: e.target.value })
  );

  const handleSubmit = async (data) => {
    setPending(true);
    const { email, password } = data
    const firebaseDetails = await auth.signup(email, password);

    console.log(firebaseDetails, data)

    const newUser = await Api.createUser(Object.assign(data, firebaseDetails));

    console.log(newUser)
    
    const clearValues = () => {
      setAuthData({
        first: '',
        last: '',
        email: '',
        password: ''
      });
    };
    clearValues();

    setPending(false)

    handleClose()
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={e => {
            e.preventDefault();
            handleSubmit(authData);
          }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first"
                variant="outlined"
                fullWidth
                id="first"
                label="First Name"
                autoFocus
                value={authData ? first : "first"}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="last"
                label="Last Name"
                name="last"
                autoComplete="lname"
                value={authData ? last : "last"}
                onChange={onChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={authData ? email : "email"}
                onChange={onChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={authData ? password : "password"}
                onChange={onChange}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          {pending ? <ClipLoader /> :
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          }
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={() => setType("signin")}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUp;