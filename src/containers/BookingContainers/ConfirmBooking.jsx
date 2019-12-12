import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import HomeIcon from "@material-ui/icons/Home"
import EventIcon from "@material-ui/icons/Event"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import useRoom from "../../components/Room/useRoom"
import { isObject } from "util"
import CircularProgress from "@material-ui/core/CircularProgress"
//GraphQL

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

function ConfirmBooking({ booking, roomId }) {
  const classes = useStyles()
  const { room, loading } = useRoom({ id: roomId })
  if (loading) {
    return <CircularProgress />
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <HomeIcon fontSize="large" />
          </Grid>
          <Grid item>
            <Typography variant="h4" component="h2" gutterBottom>
              {room.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <EventIcon fontSize="large" />
          </Grid>
          <Grid item>
            <Typography variant="h5" component="h3" gutterBottom>
              {booking.date}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <AccessTimeIcon fontSize="large" />
          </Grid>
          <Grid item>
            <Typography variant="h5" component="h3">
              {booking.startTime + "-" + booking.endTime}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ConfirmBooking
