import React, { useContext } from 'react';
import { useRouter } from '../hooks/useRouter.js';
import { useAuth } from '../hooks/useAuth.js';
import { MongoContext } from '../hooks/useMongoDb.js';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const FullMenu = ({ handleOpen, isMenuOpen, handleMenuClose, anchorEl }) => {
  const router = useRouter();
  const auth = useAuth();
  const user = useContext(MongoContext);
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id='primary-search-account-menu'
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
  )
}

export default FullMenu;