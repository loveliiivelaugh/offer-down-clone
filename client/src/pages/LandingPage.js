import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import backgroundImage from '../assets/offerdownbackground.jpeg';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: 'url(' + backgroundImage + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  
  
  return (
    <div className={classes.root} style={{height:'67vh'}} />
  )
}

export default LandingPage
