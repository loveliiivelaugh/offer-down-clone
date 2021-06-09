import React from 'react';
// import CheckoutForm from '../components/CheckoutForm';
import Confetti from 'confetti-react';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import { makeStyles } from '@material-ui/core/styles';
// import Header from '../components/Header';
// import backgroundImage from '../assets/offerdownbackground.jpeg';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     minHeight: '100vh',
//     backgroundImage: backgroundImage,
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//   },
// }));

const LandingPage = () => {
  const classes = useStyles();
  const [confettiSwitch, toggleConfetti] = React.useState(false);
  return (
    <div style={{height:'67vh'}}>
    {/* <div className={classes.root} style={{height:'67vh'}}> */}
      {confettiSwitch && <Confetti /> }
      <h1 style={{fontSize:"160px"}}>Landing</h1>
      {/* <CssBaseline/>
        <Header/> */}
      {/* <CheckoutForm toggleConfetti={toggleConfetti} /> */}
    </div>
  )
}

export default LandingPage
