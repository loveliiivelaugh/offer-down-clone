import React, { useState, useEffect } from 'react';
import SimpleModal from './SimpleModal';
import { fade, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import FooterGrid from './FooterGrid';

import { useRouter } from '../hooks/useRouter.js';
import { useAuth } from '../hooks/useAuth.js';
import Api from '../api';

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
  grow: {
    flexGrow: 1,
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
    position: 'sticky',
    bottom: 0
  }
}));

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
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
      <Link color='inherit' href='https://material-ui.com/'>
        Terms of Service & Privacy Policy
      </Link>
    </Typography>
  );
}


const Footer = () => {
  const classes = useStyles();
  const auth = useAuth();
  const router = useRouter();

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