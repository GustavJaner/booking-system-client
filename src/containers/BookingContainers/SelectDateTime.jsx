import React from "react"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import moment from "moment"
//Component imports
import TestBooking from "../../components/Bookings/TestBooking"
import DateTimeslots from "../../components/Bookings/DateTimeslots"
//GraphQL imports
import useBookingsByRoom from "../../components/Querys/useBookingsByRoom"
import dotProp from "dot-prop"
import useRoom from "../../components/Room/useRoom"

function SelectDateTime({ roomId, date, changeDate, setTimeslot }) {
  const {
    bookings = [],
    subscribeToBookingUpdates,
    loading
  } = useBookingsByRoom({ id: roomId })

  React.useEffect(() => {
    subscribeToBookingUpdates()
  }, [])

  const roomQuery = useRoom({ id: roomId })
  if (loading || roomQuery.loading) {
    return <CircularProgress />
  }
  //const bookings = dotProp.get(bookingsQuery, "bookings")
  const room = dotProp.get(roomQuery, "room")

  const slots =
    moment(room.end, "HH:mm").diff(moment(room.start, "HH:mm"), "minutes") /
    room.duration

  const disabledDates = () => {
    var fullDates = {}
    bookings.forEach(function(i) {
      fullDates[i.date] = (fullDates[i.date] || 0) + 1
    })

    for (var b in fullDates) {
      if (fullDates[b] < slots) {
        delete fullDates[b]
      }
    }
    return fullDates
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7} lg={7}>
        <TestBooking
          date={date}
          changeDate={changeDate}
          fullDates={disabledDates()}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={5}>
        <DateTimeslots
          setTimeslot={setTimeslot}
          bookings={bookings}
          date={date}
          room={room}
        />
      </Grid>
    </Grid>
  )
}
export default SelectDateTime
