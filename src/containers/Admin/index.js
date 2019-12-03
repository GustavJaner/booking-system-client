import React from "react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import useServices from "../../components/Services/useServices"
import ServiceList from "../../components/Services/List"
import CreateService from "../../components/Service/CreateService"
//import useVisible from "../../components/GeneralHooks/useVisible"
import RoomList from "../../components/Rooms/List"
import useRooms from "../../components/Rooms/useRooms"
import CreateRoomForm from "../../components/Room/CreateRoomForm"
import AccessGroupList from "../../components/AccessGroups/List"
import useAccessGroups from "../../components/AccessGroups/useAccessGroups"
import Navbar from "../../components/Navbar/navbar"
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import { AutoComplete } from "material-ui"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(2)
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
  //const servicesVisible = useVisible()
  //const roomsVisible = useVisible()
  //const accessGroupVisible = useVisible()
  const classes = useStyles();
  //const theme = useTheme();

  //console.log(accessGroups)
  //console.log(servicesVisible)


  return (
    
    <MuiThemeProvider>
      <div className={classes.root}> 

      <Navbar />
      
      <div className={classes.content}>

          <Route path="/services">
            <Paper className={classes.paper}>
              <h2>Services</h2>
                <>
                  <ServiceList services={services} />
                  <CreateService />
                </>
            </Paper>
          </Route>

        <Route path="/rooms">
          <Paper className={classes.paper}>
            <h2>Rooms</h2>
              <>
                <RoomList rooms={rooms} />
                <CreateRoomForm />
              </>
          </Paper>
        
        </Route>
       
        <Route path="/accessgroups">
          <Paper className={classes.paper}>
            <h2> AccessGroups</h2>
            <AccessGroupList accessGroups={accessGroups} />
          </Paper>
        </Route>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

export default Admin
