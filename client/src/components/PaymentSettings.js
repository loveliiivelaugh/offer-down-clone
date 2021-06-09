import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { PromiseProvider } from 'mongoose';
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

function PaymentSettings(props) {

    const classes = useStyles();
    console.log(props);
    const user = {
        name: 'Melanie',
        email: 'melanie@test.com',
        location: 'Chicago, IL',
        password: 'password123',
        balance: 10.75

    }


    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Payment Information
            </Typography>
                    <div className={classes.demo}>
                        <List>
                            <ListItem>
                                <ListItemText>
                                    Balance: $ {user.balance}
                                </ListItemText>
                                <Button variant="contained" color="primary">
                                    MANAGE BALANCE
                                </Button>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Payment Methods
                                </ListItemText>
                                <Button variant="contained" color="primary">
                                    EDIT
                                </Button>
                            </ListItem>
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default PaymentSettings;