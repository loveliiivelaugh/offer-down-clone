import { Button, Card, CardContent, CardHeader, Container, Typography } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, { useState } from 'react';
import SimpleModal from '../components/SimpleModal';

const SellingPage = () => {
  //Modal
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("sell");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //end modal

  return (
    <Container className="container center">
      
      <Typography variant="h3" gutterBottom>Selling</Typography>
  
      <center>
        <NotificationsIcon />
        <Typography variant="h4" gutterBottom>Start making money</Typography>
        <Typography variant="p" gutterBottom>To post items for sale, click the button.</Typography>
        
        <Button color="primary" variant="contained" onClick={handleOpen}>
          Post an item
        </Button>
      </center>
      
      <SimpleModal 
        open={open} 
        handleClose={handleClose}
        type={type} 
        setType={setType}
      />
    </Container>
  )
}

export default SellingPage
