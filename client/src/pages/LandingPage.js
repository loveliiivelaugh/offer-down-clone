import React from 'react';
import CheckoutForm from '../components/CheckoutForm';
import Three from  '../components/Three';
import ThreeModel from  '../components/ThreeModel';
import Confetti from 'confetti-react';

const LandingPage = () => {
  const [confettiSwitch, toggleConfetti] = React.useState(false);
  return (
    <div>
      {confettiSwitch && <Confetti /> }
      <h1 style={{fontSize:"160px"}}>Landing</h1>
      <CheckoutForm toggleConfetti={toggleConfetti} />
      <Three />
    </div>
  )
}

export default LandingPage
