import React, { useContext, useState } from 'react';
import { MongoContext } from '../hooks/useMongoDb.js';
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
    text: {
        color: 'white'
    }
}));

function PaymentSettings({ linkToken }) {
    const classes = useStyles();
    //Modal
    const [open, setOpen] = useState(false);
    // const [type, setType] = useState("signin");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //end modal

    const user = useContext(MongoContext);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <div className={classes.demo}>
                    <Card>
                    <List>
                        <ListItem>
                            <ListItemText>
                                Balance: ${user?.data?.balance ? user.data.balance : 0}
                            </ListItemText>
                            <Button variant="outlined" color="primary" className={classes.text}>
                            {linkToken &&
                                <Plaid linkToken={linkToken} />

                            }
                            </Button>
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