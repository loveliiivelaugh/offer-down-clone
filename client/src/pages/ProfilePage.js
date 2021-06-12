import React from 'react';
import { requireAuth } from '../hooks/useAuth.js';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ProfileCard from '../components/ProfileCard';
import ProfileList from '../components/ProfileList';


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

function ProfilePage(props) {
    const classes = useStyles();
    return (
    <>
        <Typography variant="h6" className={classes.title}>
            Your Profile
        </Typography>
        <ProfileCard props={props} />
        <ProfileList props={props} />
    </>
    )
}

export default requireAuth(ProfilePage);