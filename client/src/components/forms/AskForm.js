import React from 'react';
import { Button, Grid, Typography, TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AskForm = ({ handleClose, setType, type }) => {
  const classes = useStyles();

  switch (type) {
    case "message":
      return (
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Send a Message
          </Typography>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Grid container spacing={3}>
            <form>
              <Grid item xs={12} sm={12}>
                <label htmlFor="askMessage">New message</label>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextareaAutosize
                  aria-label="Write a message..." 
                  placeholder="Write a message..." 
                  rowsMin={5} 
                  required
                  id="askMessage"
                  name="message"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button variant="outlined" color="secondary" onClick={() => {}}>Send</Button>
              </Grid>
            </form>
          </Grid>
        </div>
      )
    case "ask":
      return (
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Send a Message
          </Typography>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Typography variant="body2" component="p">
                  Click a message to send or write your own:
                </Typography>
                <Button variant="outlined" color="primary">
                  Hi, is this still available?
                </Button>
                <Button variant="outlined" color="primary">
                  Hi, I'd like to buy this
                </Button>
                <Button variant="outlined" color="primary">
                  Hi, can you meet today?
                </Button>
              </Grid>
              <Grid item xs={12} sm={12}>
                <label htmlFor="askMessage">New message</label>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextareaAutosize
                  onClick={() => setType("message")}
                  aria-label="Write a message..." 
                  placeholder="Write a message..." 
                  rowsMin={5} 
                  required
                  id="askMessage"
                  name="message"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
            </Grid>
          </form>
        </div>
      )
      default:
        return;
  }
};

export default AskForm;