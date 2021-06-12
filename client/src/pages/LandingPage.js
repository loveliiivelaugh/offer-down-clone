import React from 'react';
// import CheckoutForm from '../components/CheckoutForm';
import Confetti from 'confetti-react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header';
import BuyandSell from '../components/BuyandSell';

const LandingPage = () => {
  const [confettiSwitch, toggleConfetti] = React.useState(false);
  return (
    <div>
    {/* </div><div className={classes.root} style={{height:'67vh'}}> */}
      {confettiSwitch && <Confetti /> }
      <CssBaseline/>
        <Header/> 
      
      {/* <CheckoutForm toggleConfetti={toggleConfetti} /> */}
    </div>
  )
}

export default LandingPage
