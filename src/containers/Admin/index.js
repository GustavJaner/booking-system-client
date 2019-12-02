import React from "react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import useServices from "../../components/Services/useServices"
import ServiceList from "../../components/Services/List"
import CreateService from "../../components/Service/CreateService"
import useVisible from "../../components/GeneralHooks/useVisible"
import RoomList from "../../components/Rooms/List"
import useRooms from "../../components/Rooms/useRooms"
import CreateRoomForm from "../../components/Room/CreateRoomForm"
import AccessGroupList from "../../components/AccessGroups/List"
import useAccessGroups from "../../components/AccessGroups/useAccessGroups"
import Navbar from "../../components/Navbar/navbar"
import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(6)
  },
}));

const Admin = () => {
  const { services = [], loading } = useServices()
  const { rooms = [] } = useRooms()
  const { accessGroups = [] } = useAccessGroups()
  const servicesVisible = useVisible()
  const roomsVisible = useVisible()
  const accessGroupVisible = useVisible()
  const classes = useStyles();
  const theme = useTheme();

  //console.log(accessGroups)
  //console.log(servicesVisible)


  return (
    
    <MuiThemeProvider>
      <div className={classes.root}> 

      <Navbar />
      
      <div className={classes.content}>

      
        <h2 onClick={() => servicesVisible.toggle()}>Services</h2>
        {servicesVisible.open && (
          <>
            <ServiceList services={services} />
            <CreateService />
          </>
        )}

        <h2 onClick={() => roomsVisible.toggle()}> Rooms</h2>
        {roomsVisible.open && (
          <>
            <RoomList rooms={rooms} />
            <h1> CREATE!!!!</h1>
            <CreateRoomForm />
          </>
        )}

        <h2 onClick={() => accessGroupVisible.toggle()}> AccessGroups</h2>
        {accessGroupVisible.open && (
          <AccessGroupList accessGroups={accessGroups} />
        )}
        </div>
      </div>

    </MuiThemeProvider>
  )
}

export default Admin
