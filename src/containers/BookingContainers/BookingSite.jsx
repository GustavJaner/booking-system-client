import React, { useState, forwardRef } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import LoadingAnimation from "../../components/General/LoadingAnimation"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import clsx from "clsx"
import Select from "react-select"
import SelectDateTime from "./SelectDateTime"
import InputLabel from "@material-ui/core/InputLabel"
import ConfirmBooking from "../../components/Bookings/ConfirmBooking"
import { Redirect } from 'react-router';
import moment from "moment"


//GraphQL Imports
import useAddBooking from "../../components/Booking/useAddBooking"
import useServices from "../../components/Services/useServices"
import useRooms from "../../components/Rooms/useRooms"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  stepper: {
    marginBottom: "50px"
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    minHeight: 240
  }
}))


function getSteps() {
  return [
    "Select a service",
    "Select a room",
    "Select date and timeslot",
    "Confirm booking"
  ]
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Select service to continue"
    case 1:
      return "Select room to continue"
    case 2:
      return "Select date and time to continue"
    case 3:
      return "Click confirm to make your booking"
    default:
      return "Booking confirmed!"
  }
}

function BookingSite() {
  const classes = useStyles()
  //Stepper states & buttons
  const [activeStep, setActiveStep] = React.useState(0)
  const [serviceId, setServiceId] = useState(null)
  const steps = getSteps()
  //Booking information

  const servicesQuery = useServices()
  const roomsQuery = useRooms()

  const [date, changeDate] = useState(moment())
  const [timeslot, setTimeslot] = useState(null)
  const [selectedRoomId, setSelectedRoomId] = useState(null)
  const [createBooking, { called }] = useAddBooking({ id: selectedRoomId })
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  //Next stepper stage
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }
  //Previous stepper stage
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  //Turn all booking information into a single object and add the booking to the database
  const makeBooking = () => {
    return {
      startTime: timeslot.start,
      endTime: timeslot.end,
      date: date.format("DD-MM-YYYY"),
      roomId: selectedRoomId
    }
  }
  const getRoomOptions = () => {
    return roomsQuery.rooms
      .filter(room => room.service && room.service.id === serviceId)
      .map(room => ({
        label: room.name,
        value: room.id
      }))
  }

  const getServicesOptions = () => {
    return servicesQuery.services.map(service => ({
      label: service.name,
      value: service.id
    }))
  }
  const sendBooking = () => {
    createBooking({
      startTime: timeslot.start,
      endTime: timeslot.end,
      date: date.format("DD-MM-YYYY"),
      roomId: selectedRoomId
    })
  }

  const nextDisabled = () => {
    switch (activeStep) {
      case 0:
        return serviceId ? false : true
      case 1:
        return selectedRoomId ? false : true
      case 2:
        return date instanceof moment && timeslot != null ? false : true
      case 3:
        return false
      default:
        return true
    }
  }


  if (servicesQuery.loading || roomsQuery.loading) {
    return <LoadingAnimation />
  }

  if (called) {
    return <Redirect push to="/dashboard" />;
  }

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Paper className={fixedHeightPaper}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          className={classes.stepper}
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <>
            <div style={{ zIndex: 1000 }}>
              <InputLabel id="select-service">Select Service</InputLabel>
              <Select
                labelId="select-service"
                options={getServicesOptions()}
                onChange={e => setServiceId(e.value)}
              />
            </div>
          </>
        )}
        {activeStep === 1 && (
          <>
            <div style={{ zIndex: 1000 }}>
              <InputLabel id="select-room">Select Room </InputLabel>
              <Select
                labelId="select-room"
                id="select"
                onChange={e => setSelectedRoomId(e.value)}
                options={getRoomOptions()}
              />
            </div>
          </>
        )}
        {activeStep === 2 && (
          <SelectDateTime
            roomId={selectedRoomId}
            date={date}
            changeDate={changeDate}
            setTimeslot={setTimeslot}
          />
        )}
        {activeStep >= 3 && (
          <ConfirmBooking booking={makeBooking()} roomId={selectedRoomId} />
        )}
        <div>
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
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
                onClick={activeStep === 3 ? sendBooking : handleNext}
                disabled={nextDisabled()}
              >
                {activeStep === steps.length - 1 ? "Confirm" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </Paper>
    </Container>
  )
}

export default BookingSite
