import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LoadingAnimation from '../General/LoadingAnimation';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';

import SelectRoom from '../../containers/BookingContainers/SelectRoom'
import SelectDateTime from '../../containers/BookingContainers/SelectDateTime'
import ConfirmBooking from '../../containers/BookingContainers/ConfirmBooking'

import moment from 'moment';

//GraphQL Imports
import useRoomByServiceId from '../Querys/useRoomByService';
import useAddBooking from '../Mutations/useAddBooking';


const tempUserId = "5de3c20b7895eaf4c9c3241d";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    stepper: {
        marginBottom: '50px'
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

function getSteps() {
    return ['Select a room', 'Select date and timeslot', 'Confirm booking'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return 'Select room to continue';
        case 1:
            return 'Select date and time to continue';
        case 2:
            return 'Click confirm to make your booking';
        default:
            return 'Booking confirmed!';
    }
}

function BookingSite() {
    const classes = useStyles();
    //Stepper states & buttons
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    //Booking information
    const { rooms, loading } = useRoomByServiceId({ id: "5ddd02e254410b2d9aeffeb1" });
    const [date, changeDate] = useState(moment());
    const [timeslot, setTimeslot] = useState(null);
    const [room, setRoom] = useState(null);
    const [createBooking] = useAddBooking();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    //Next stepper stage
    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };
    //Previous stepper stage
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    //Turn all booking information into a single object and add the booking to the database
    const makeBooking = () => {
        return ({
            startTime: timeslot.start,
            endTime: timeslot.end,
            date: date.format('DD-MM-YYYY'),
            userId: tempUserId,
            roomId: room.id
        });
    }

    const sendBooking = () => {
        createBooking({
            startTime: timeslot.start,
            endTime: timeslot.end,
            date: date.format('DD-MM-YYYY'),
            userId: tempUserId,
            roomId: room.id
        });
        handleNext();
    }

    const nextDisabled = () => {
        switch (activeStep) {
            case 0:
                return (room == null ? true : false);
            case 1:
                return (date instanceof moment && timeslot != null ? false : true);
            case 2:
                return false;
            default:
                return true;
        }
    }

    if (loading) {
        return <LoadingAnimation />
    }

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Paper className={fixedHeightPaper}>
                <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {(activeStep === 0) && (
                    <SelectRoom rooms={rooms} setRoom={setRoom} />
                )}
                {(activeStep === 1) && (
                    <SelectDateTime room={room} date={date} changeDate={changeDate} setTimeslot={setTimeslot} />
                )}
                {(activeStep >= 2) && (
                    <ConfirmBooking booking={makeBooking()} room={room} />
                )}
                <div>
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
                        </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={activeStep === 2 ? sendBooking : handleNext}
                                disabled={nextDisabled()}>
                                {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
                            </Button>
                        </div>
                    </div>
                </div>
            </Paper>
        </Container>
    );
};

export default BookingSite;