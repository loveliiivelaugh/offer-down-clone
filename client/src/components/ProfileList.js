import React from 'react';
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
    const user = {
        name: 'Melanie',
        email: 'melanie@test.com',
        location: 'Chicago, IL',
        password: 'password123',
        posted_items: {
            title: 'Blanket',
            price: '12'
        }
    };
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Items from this seller
                    </Typography>
                    <div className={classes.demo}>
                        <List>
                            <ListItem>
                                <Link to={'/products/' + user.posted_items.id}><ListItemText
                                    primary={user.posted_items.title}
                                />
                                </Link>
                            </ListItem>
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}


export default ProfileList;