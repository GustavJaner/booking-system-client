import React from "react"
import client from "./apollo"
import { ApolloProvider } from "@apollo/react-hooks"
import AdminHome from "./containers/Admin/AdminHome"
import Navbar from "./components/Drawer/drawer"
import AdminAccessGroups from "./containers/Admin/AdminAccessGroups"
import AdminRooms from "./containers/Admin/AdminRooms"
import AdminServices from "./containers/Admin/AdminServices"
import { Switch, Route } from "react-router-dom";
import AdminUsers from "./containers/Admin/AdminUsers"
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Bookingsite from './components/Bookings/BookingSite'
import PageNotFound from './containers/404Page'
import Dashboard from './containers/Dashboard/Dashboard.jsx';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(6)
  },
  appBarSpacer: theme.mixins.toolbar,

}));

const App = () => {
  const classes = useStyles()

  return (
    <ApolloProvider client={client}>
      <div className={classes.root}>
        <CssBaseline />
        <Navbar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer}>
            <Switch>
              <Route exact path='/' render={() => <Dashboard />} />
              <Route path='/booking' render={() => <Bookingsite />} />
              <Route exact path='/admin' render={() => <AdminHome />} />
              <Route exact path='/services' render={() => <AdminServices />} />
              <Route exact path='/rooms' render={() => <AdminRooms />} />
              <Route exact path='/accessgroups' render={() => <AdminAccessGroups />} />
              <Route exact path='/users' render={() => <AdminUsers />} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </main>
      </div>
    </ApolloProvider>
  )

}

export default App
