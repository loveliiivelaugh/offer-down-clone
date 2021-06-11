import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard';
import buyImage1 from '../assets/buying.jpeg';
import buyImage2 from '../assets/selling.jpeg';
import useWindowPosition from '../hooks/useWindowPosition';
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));
export default function () {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  return (
    <div className={classes.root} id="buy-sell">
      <ImageCard buy={buyImage1} checked={checked} />
      <ImageCard buy={buyImage2} checked={checked} />
    </div>
  );
}
