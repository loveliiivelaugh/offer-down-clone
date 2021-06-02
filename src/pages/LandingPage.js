import React from 'react';
import CheckoutForm from '../components/CheckoutForm';
import Three from  '../components/Three';
import ThreeModel from  '../components/ThreeModel';
import ConfettiGenerator from "confetti-js";


const LandingPage = () => {
  const [confettiSwitch, toggleConfetti] = React.useState(false);

  // const canvas = document.createElement('canvas');
  // const div = document.querySelector("div");
  // div.appendChild(canvas);
  // canvas.setAttribute({ id: "canvas" });
  // const confetti = new ConfettiGenerator(canvas);
  // if (confettiSwitch) {
  //   confetti.render();
  // } else if (!confettiSwitch) {
  //   // confetti.clear();
  // }

  return (
    <div>
      {/* <canvas id="canvas" ></canvas> */}
      <h1 style={{fontSize:"160px"}}>Landing</h1>
      <CheckoutForm toggleConfetti={toggleConfetti} />
      {/* <Three /> */}
    </div>
  )
}

export default LandingPage
