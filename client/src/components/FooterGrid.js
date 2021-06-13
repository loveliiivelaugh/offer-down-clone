import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { SocialIcon } from 'react-social-icons';
import { useRouter } from "../hooks/useRouter.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  pink: {
    color: '#EB6E80'
  },
  app: {
    marginTop: 15,
    marginLeft: 105
  },
  row1: {
    marginTop: 20,
    marginLeft: 115
  },
  row2: {
    marginLeft: 115

  }
}));

function FooterGrid() {

  const classes = useStyles();
  const router = useRouter();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs className={classes.pink}>
          <h4>Shop</h4>
          <p><Link color="inherit" href="#">
            How it works</Link></p>
          <p onClick={() => router.push('/home')}
          ><Link color="inherit" href="#">
              Explore</Link></p>
          <p><Link color="inherit" href="#">
            Trust & safety</Link></p>
          <p><Link color="inherit" href="#">
            Safe trade spots</Link></p>
        </Grid>
        <Grid item xs className={classes.pink}>
          <h4>Sell</h4>
          <p onClick={() => router.push('/selling')}><Link color="inherit" href="#">
            Post an item</Link></p>
          <p><Link color="inherit" href="#">
            Auto dealerships</Link></p>
        </Grid>
        <Grid item xs className={classes.pink}>
          <h4>About</h4>
          <p><Link color="inherit" href="#">
            Our story</Link></p>
          <p><Link color="inherit" href="#">
            Careers</Link></p>
          <p><Link color="inherit" href="#">
            Press</Link></p>
        </Grid>
        <Grid item xs className={classes.pink}>
          <h4>Help</h4>
          <p><Link color="inherit" href="#">
            Help center</Link></p>
          <p><Link color="inherit" href="#">
            Community</Link></p>
          <p><Link color="inherit" href="#">
            Blog</Link></p>
        </Grid>
        <Grid item xs={3}>
          <Grid>
            <Button variant="outlined" color='secondary' href="#outlined-buttons" className={classes.app}>
              Get the app</Button>
          </Grid>
          <Grid className={classes.row1}>
            <SocialIcon url="https://twitter.com/" />
            <SocialIcon url="https://facebook.com/" />
          </Grid>
          <Grid className={classes.row2}>
            <SocialIcon url="https://instagram.com/" />
            <SocialIcon url="https://linkedin.com/" />
          </Grid>
        </Grid>
      </Grid>

    </div>
  );
}

export default FooterGrid;
