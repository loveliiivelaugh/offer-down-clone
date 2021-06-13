import React, { useContext } from 'react';
import { useRouter } from '../hooks/useRouter.js';
import { useAuth } from '../hooks/useAuth.js';
import { MongoContext } from '../hooks/useMongoDb.js';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';

const MobileMenu = ({ mobileMoreAnchorEl, isMobileMenuOpen, handleMobileMenuClose }) => {
  const router = useRouter();
  const auth = useAuth();
  const user = useContext(MongoContext);

  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id='primary-search-account-menu-mobile'
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
  )
}

export default MobileMenu
