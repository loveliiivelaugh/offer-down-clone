import React from 'react';
import { Card, CardContent, Divider, List, ListItem, ListItemText, ListItemIcon, Typography } from '@material-ui/core';
// import { ShareIcon } from '@material-ui/icons';

const SideNavCard = ({ handleNav }) => {
  return (
    <Card>
      <CardContent>
        <Typography component="h1" variant="h4" align="left">
          Account
        </Typography>
      </CardContent>
      <CardContent>
      
        <Divider />
        <Typography component="h6" variant="h6" align="left">
          Transactions
        </Typography>
        <List>
          <ListItem button onClick={() => handleNav.purchases()}>
            <ListItemText primary="Purchases & Sales" />
          </ListItem>
          <ListItem button onClick={() => handleNav.banking()}>
            <ListItemText primary="Payment & Deposit methods" />
          </ListItem>
        </List>
        <Divider />
        <Typography component="h6" variant="h6" align="left">
          Saves
        </Typography>
        <List>
          <ListItem button onClick={() => handleNav.saves()}>
            <ListItemText primary="Saved items" />
          </ListItem>
          
          </List>
        <Divider />
        <Typography component="h6" variant="h6" align="left">
          Account
        </Typography>
        <List>
          <ListItem button onClick={() => handleNav.settings()}>
            <ListItemText primary="Account Settings" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="View public profile" />
            <ListItemIcon>
              {/* <ShareIcon /> */}
            </ListItemIcon>
          </ListItem>
        </List>
      
      </CardContent>
    </Card>
  )
}

export default SideNavCard
