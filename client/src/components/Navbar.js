import React, { useContext, useState } from 'react';
import { MongoContext } from '../hooks/useMongoDb.js';
import SimpleModal from './SimpleModal';
import { fade, makeStyles } from '@material-ui/core/styles';
import { 
  AppBar, Collapse, InputBase, Toolbar, IconButton, Typography, Button, Badge, MenuItem, Menu, CssBaseline, Paper, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Avatar, Tabs, Tab 
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
// import SearchIcon from '@material-ui/icons/Search';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from "../hooks/useRouter.js";
import { useAuth } from "../hooks/useAuth.js";
import ClipLoader from "react-spinners/ClipLoader";
import { AiOutlineShop } from 'react-icons/ai';



// // Structure of messages popover modal message data
// const messages = [
//   {
//     id: 1,
//     primary: 'Brunch this week?',
//     secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
//     person: '/static/images/avatar/5.jpg',
//   },
// ];


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'block',
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
}));


const Navbar = () => {
  const classes = useStyles();
  const auth = useAuth();
  const router = useRouter();
  const user = useContext(MongoContext);
  console.log(user);

  const [inboxType, toggleInboxType] = useState("messages")
  const handleChange = (event) => {
    const newValue = inboxType === "messages" ? "notifications" : "messages";
    toggleInboxType(newValue);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  //Modal
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("signin");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //end modal

  //messages and notifications dropdown
  const [expanded, setExpanded] = useState(false);
  // const [alerts, setAlerts] = useState({
  //   title: ""
  // });

  const handleExpandClick = (e) => {
    e.preventDefault();
    // switch (type) {
    //   case "messages":
    //     setAlerts({ title: "Messages" })
    //     break;
    //   case "notifications":
    //     setAlerts({ title: "Notifications" })
    //     break;
    //   default:
    //     setAlerts({ title: "Notifications" })
    // } 
    
    setExpanded(!expanded);
  };
  //end messages and notifications drop down

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleAccept = (data) => {
    router.push({
      pathname: '/checkout',
      state: data
    })
  }

  const handleDecline = () => {

  }



  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {auth.user ? (
        <div>
          <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
          <MenuItem onClick={() => router.push('/accounts')}>My account</MenuItem>
          <Button onClick={() => auth.signout()}>Signout</Button>
        </div>
        ) : (
      <MenuItem onClick={handleOpen}>Login</MenuItem>
        )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {auth.user &&
        <div>
          <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={user?.data?.messages?.length || 0} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem onClick={() => router.push('/selling')}>
            <IconButton aria-label="selling page" color="inherit">
              <Badge color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Your Items</p>
          </MenuItem>
        </div>
      }
      <MenuItem onClick={() => router.push('/accounts')}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

    console.log(user);

    function emailGreeting() {
      return <div>Welcome {user?.data?.email}!</div>
    }

    function nameGreeting() {
      return <div>Welcome {user?.data?.name}!</div>
    }

    function Greeting() {
     if (!user?.data?.name) {
       return <emailGreeting />
     } else {
       return <nameGreeting />
     }
    } 

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography 
            className={classes.title} 
            variant="h6" 
            noWrap 
            onClick={() => router.push('/home')}
            style={{cursor:'pointer'}}
          >
            OfferDown
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          {auth.user &&
            <div>
              <Greeting />
              {/* Welcome {user?.data?.email}! */}
              {/* Welcome {user.data.name}! */}

            </div>
          }
          <div className={classes.sectionDesktop}>
          {auth.user &&
            <div>
              <IconButton aria-label="add to favorites" color="inherit" onClick={() => router.push('/accounts')}>
                <Badge badgeContent={auth?.user?.liked_items?.length || 0} color="secondary">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
              <IconButton id="messages" aria-label="show 4 new mails" color="inherit" onClick={handleExpandClick}>
                <Badge badgeContent={
                  user?.data?.messages?.length +
                  user?.data?.notifications?.length || 0
                  } color="secondary"
                >
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton id="notifications" aria-label="show 17 new notifications" color="inherit" onClick={() => router.push('/selling')}>
                <Badge badgeContent={0} color="secondary">
                  <AiOutlineShop />
                </Badge>
              </IconButton>
            </div>
          }
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={auth.user ? handleProfileMenuOpen : handleOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          <div>
            <SimpleModal 
              open={open} 
              handleClose={handleClose}
              type={type}
              setType={setType}
            />
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CssBaseline />
        <Paper square className={classes.paper}>
        <AppBar position="static">
          <Tabs
            value={inboxType}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Messages"></Tab>
            <Tab label="Notifications"></Tab>
          </Tabs>
        </AppBar>

          {inboxType === "messages" ? (
            <>
            <Typography className={classes.text} variant="h5" gutterBottom>
              Messages
            </Typography>
            <List className={classes.list}>
              {user.status === "loading" ? <ClipLoader loading={true} /> : 
                user.status === "success" &&
                user.data != null ? 
                user.data.messages.map(({ id, content, secondary, person }) => (
                <React.Fragment key={id}>
                  {id === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
                  <ListSubheader className={classes.subheader}>Today</ListSubheader>
                  {id === 3 && <ListSubheader className={classes.subheader}>Yesterday</ListSubheader>}
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" src={person} />
                    </ListItemAvatar>
                    <ListItemText primary={content} secondary={content} />
                  </ListItem>
                </React.Fragment>
              )) : "You must log in to view your messages." }
              
            </List>
            </>
          ) : 
          inboxType === "notifications" && (
            <>
            <Typography className={classes.text} variant="h5" gutterBottom>
              Notifications
            </Typography>
            <List className={classes.list}>
              {user.status === "loading" ? <ClipLoader loading={true} /> : 
                user.status === "success" &&
                user.data != null ? 
                user.data.notifications.map(({ _id, amount, sender_id, recepient_id, type }) => (
                <React.Fragment key={_id}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" src="" />
                    </ListItemAvatar>
                    <ListItemText 
                      primary={
                        sender_id + " wants to offer you $" + amount + " for your item " + _id + "." 
                      } 
                      secondary={amount} 
                    />
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="small"
                      onClick={e => {
                        e.preventDefault();
                        handleAccept({
                          _id,
                          sender_id,
                          recepient_id
                        })
                        setExpanded(false);
                      }}
                    >
                      Accept
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="secondary" 
                      size="small"
                      onClick={e => {
                        e.preventDefault();
                        handleDecline();
                      }}
                    >
                      Decline
                    </Button>
                  </ListItem>
                </React.Fragment>
              )) : "You must log in to view your notifications." }
            </List>
            </>
          )
        }
        </Paper>
      </Collapse>
    </div>
  );
}

export default Navbar
