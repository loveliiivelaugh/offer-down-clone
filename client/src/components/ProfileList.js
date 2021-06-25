import React, { useContext } from 'react';
import { MongoContext } from '../hooks/useMongoDb.js';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';


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

function ProfileList(props) {
    const classes = useStyles();
    const user = useContext(MongoContext);

    console.log(user)
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Items from this seller
                    </Typography>
                    <div className={classes.demo}>
                        <List>
                            {user.posted_items ? user.posted_items.map(item => (
                                <ListItem>
                                    <ListItemText>
                                         <Link to={'/products/' + item.id} />
                                </ListItemText>
                                </ListItem>
                            )) : 'No items to show'}
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}


export default ProfileList;