import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FooterGrid from './FooterGrid';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  service: {
    marginLeft: 590
  },
  grey: {
    backgroundColor: '#DFDCE3'
  },
  footer: {
    position: 'static',
    bottom: 0
  }
}));

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary'>
      {'Copyright © '}
      <Link color='inherit' to='https://material-ui.com/'>
        OfferDown
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

function TermsOfService() {
  const classes = useStyles();

  return (
    <Typography variant='body2' color='textSecondary' className={classes.service}>
      <Link color='inherit' to='https://material-ui.com/'>
        Terms of Service & Privacy Policy
      </Link>
    </Typography>
  );
}


const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar className={classes.footer}>
        <Toolbar className={classes.grey}>
          <List>
            <ListItem>
              <FooterGrid />
            </ListItem>
            <ListItem>
              <Copyright />
              <TermsOfService />
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Footer;