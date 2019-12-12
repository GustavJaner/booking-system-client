import React from "react"
import Paper from '@material-ui/core/Paper';
import RoomList from "../../components/Rooms/List"
import useRooms from "../../components/Rooms/useRooms"
import { makeStyles } from '@material-ui/core/styles'
import CreateRoomForm from "../../components/Room/CreateRoomForm"
import Typography from '@material-ui/core/Typography';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import useVisible from "../../components/GeneralHooks/useVisible";

const useStyles = makeStyles(theme => ({

  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(2)
  }

}));

const AdminRooms = () => {

  const { rooms = [] } = useRooms()
  console.log(rooms)
  const classes = useStyles()
  const { open, setFalse, toggle } = useVisible(true)

  return(
    <MuiThemeProvider>

    <Paper className={classes.paper}>
      <Typography variant="h6" noWrap>
        Rooms
      </Typography>
      <>
        <RoomList rooms={rooms} toggle={toggle}/>
        {open && <CreateRoomForm/>}
      </>
  </Paper>
  </MuiThemeProvider>
  )
}
export default AdminRooms

  