import React, { useState } from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import moment from "moment"

import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"

import CircularProgress from "@material-ui/core/CircularProgress"

import RemoveBookningSnackbar from '../../components/General/RemoveBookingSnackbar'
import useBookingsByUser from "../../components/Bookings/useBookingsByUser"
import useRemoveBooking from "../../components/Booking/useRemoveBooking"
import CurrentBookings from "../../components/Bookings/CurrentBookings"

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
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

export default function Dashboard() {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  const [bookingId, setBookingId] = useState(null)
  const [removeBooking, { error }] = useRemoveBooking({ id: bookingId });
  const { bookings, loading } = useBookingsByUser()
  const [open, setOpen] = useState(false);

  async function handleDelete(booking) {
    await setBookingId(booking.room.id);
    removeBooking({ id: booking.id });
    setOpen(true);
  }

  const futureBooking = booking => {
    var today = moment()
    var date = moment(booking.date, "DD-MM-YYYY")
    return date.isSameOrAfter(today, 'day')
  }

  if (loading) {
    return (
      <div className={classes.loading}>
        {" "}
        <CircularProgress />{" "}
      </div>
    )
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {bookings.length > 0 ? (
            <Paper className={fixedHeightPaper}>
              {bookings.map(booking => {
                if (futureBooking(booking))
                  return (
                    <CurrentBookings
                      key={booking.id}
                      booking={booking}
                      handleDelete={handleDelete}
                    />
                  )
              })}
            </Paper>
          ) : (
              <p> No bookings </p>
            )}
        </Grid>
      </Grid>
      <RemoveBookningSnackbar open={open} setOpen={setOpen} error={error} />
    </Container>
  )
}
