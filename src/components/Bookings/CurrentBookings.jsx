import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import IconButton from "@material-ui/core/IconButton";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";
import PropTypes from "prop-types";
//GraphlQL
import useRemoveBooking from '../Booking/useRemoveBooking';


const useStyles = makeStyles({
    card: {
        width: '600px',
    },
    title: {
        fontSize: 14,
    },
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: '#d32f2f',
    },
    icon: {
        fontSize: 20,
    },
    message: {
        display: "flex",
        alignItems: "center"
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: '20px',
        fontSize: 20,
    }
});

const variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon
};

const variantMessage = {
    success: 'Booking has been removed!',
    error: 'Error, booking has not been removed'
}

MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired
};

function MySnackbarContentWrapper(props) {
    const classes = useStyles();
    const { className, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {variantMessage[variant]}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
            {...other}
        />
    );
}


function CurrentBookings({ booking }) {

    const classes = useStyles();
    const [removeBooking, { data }] = useRemoveBooking();
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        removeBooking({ id: booking.id });
        setOpen(true);
        console.log('hej')
    }


    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" align="left">
                        {booking.room.name}
                    </Typography>
                    <Typography variant="h6" align="left">
                        Date: {booking.date}
                    </Typography>
                    <Typography variant="h6" align="left">
                        Time: {booking.startTime}-{booking.endTime}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button color='primary' onClick={handleDelete}>
                        Remove
                    </Button>
                    <Button color='primary' onClick={handleDelete}>
                        Update
                    </Button>
                </CardActions>
            </Card>
            {data && (<Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                onClose={handleClose}
                autoHideDuration={5000}
            >
                <MySnackbarContentWrapper
                    onClose={handleClose}
                    variant={data['removeBooking'] ? 'success' : 'error'}
                />
            </Snackbar>)}
        </>

    );
};
export default CurrentBookings;