import React from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import CircularProgress from '@material-ui/core/CircularProgress'

import useBookingsByUser from '../../components/Querys/useBookingsByUser'
import CurrentBookings from '../../components/Bookings/CurrentBookings'

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        minHeight: 240,
    },
}));


export default function Dashboard() {
    const classes = useStyles();

    const { bookings, loading } = useBookingsByUser({ id: "5de3c20b7895eaf4c9c3241d" });

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const futureBooking = (booking) => {
        var today = moment();
        var date = moment(booking.date, 'DD-MM-YYYY')
        return (date.isSameOrAfter(today));
    }

    console.log(bookings);
    if (loading) {
        return <div className={classes.loading}> <CircularProgress /> </div>
    }

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={fixedHeightPaper}>
                        {bookings.map((booking) => {
                            if (futureBooking(booking))
                                return <CurrentBookings key={booking.date.toString()} booking={booking} />
                        })}
                    </Paper>
                </Grid>
            </Grid>
        </Container>

    );
}