import React from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';


const ImageLoader = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    //do something here.
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Upload your image.
      </Typography>
      <Grid container spacing={3}>
        <form onSubmit={submitHandler}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="image"
              name="image"
              type="file"
              fullWidth
            />

          </Grid>
          <Grid item xs={12} sm={12}>
            <Button variant="outlined" color="secondary" onClick={() => {}}>Send</Button>
          </Grid>
        </form>
      </Grid>
    </React.Fragment>
  )
}

export default ImageLoader
