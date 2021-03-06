import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function ProfileCard(props) {
    const classes = useStyles();
    const user = {
        name: 'Melanie Uhrich',
        email: 'melanie@test.com',
        location: 'Chicago, IL',
        password: 'password123'
    };

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">
                    {user.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {user.location}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ProfileCard;
