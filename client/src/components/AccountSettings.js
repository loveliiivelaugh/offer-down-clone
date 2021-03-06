import React, { useContext } from 'react';
import { MongoContext } from '../hooks/useMongoDb.js';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

function AccountSettings(props) {
    
    const classes = useStyles();


    const user = useContext(MongoContext);


function clickHandler() {
    // come back
}

    return (
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              Account Information
            </Typography>
            <div className={classes.demo}>
              <List>
                <ListItem>
                  <ListItemText
                    // If no name, 'add a name'
                    primary={user.data.first_name}
                  />
                  <Button variant="contained" color="primary" onClick={clickHandler}>
                    EDIT
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemText
                    // If no name, 'add a name'
                    primary={user.data.last_name}
                  />
                  <Button variant="contained" color="primary" onClick={clickHandler}>
                    EDIT
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={user.data.email}
                  />
                  <Button variant="contained" color="primary" onClick={clickHandler}> 
                    EDIT
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={user.data.password}
                  />
                  <Button variant="contained" color="primary" onClick={clickHandler}>
                    EDIT
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={user.data.zip_code}
                  />
                  <Button variant="contained" color="primary" onClick={clickHandler}>
                    EDIT
                  </Button>
                </ListItem>
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    )
}


export default AccountSettings;