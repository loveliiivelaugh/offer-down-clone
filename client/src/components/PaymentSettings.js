import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SimpleModal from './SimpleModal';
import Plaid from './Plaid';

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

function PaymentSettings({ linkToken }) {
    const classes = useStyles();
    //Modal
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("signin");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //end modal

    const user = {
        name: 'Melanie',
        email: 'melanie@test.com',
        location: 'Chicago, IL',
        password: 'password123',
        balance: 10.75,
        purchased_items: {
            name: 'Hat',
            price: 4.25
        }

    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <div className={classes.demo}>
                    <Card>
                    <List>
                        <ListItem>
                            <ListItemText>
                                Balance: ${user.balance}
                            </ListItemText>
                            {linkToken &&
                                <Plaid linkToken={linkToken}/>
                            }
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                Payment methods
                            </ListItemText>
                            <Button variant="contained" color="primary" onClick={handleOpen}>
                                Add credit / debit card
                            </Button>
                        </ListItem>
                    </List>
                    </Card>
                </div>
            </Grid>
            <SimpleModal open={open} handleClose={handleClose} type="payment" />
        </Grid>
    );
}

export default PaymentSettings;