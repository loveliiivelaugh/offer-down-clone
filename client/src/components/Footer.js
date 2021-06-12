import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
    width: '400px',
    zIndex: 2,
    position: 'absolute',
    right: 0,
    top: 65
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
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