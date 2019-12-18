import React from "react"
import client from "./apollo"
import { ApolloProvider } from "@apollo/react-hooks"
import AdminHome from "./containers/Admin/AdminHome"
import Navbar from "./components/Drawer/drawer"
import AdminAccessGroups from "./containers/Admin/AdminAccessGroups"
import AdminRooms from "./containers/Admin/AdminRooms"
import AdminServices from "./containers/Admin/AdminServices"
import { Switch, Route } from "react-router-dom"
import AdminUsers from "./containers/Admin/AdminUsers"
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles } from "@material-ui/core/styles"
import Bookingsite from "./components/Bookings/BookingSite"
import PageNotFound from "./containers/404Page"
import Dashboard from "./containers/Dashboard/Dashboard.jsx"
import SignInSide from "./containers/SignIn/SigninSide"
import { AUTH_TOKEN } from "./constants"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(6)
  },
  appBarSpacer: theme.mixins.toolbar
}))

const App = () => {
  const [token, setToken] = React.useState(null)
  let auth = localStorage.getItem(AUTH_TOKEN)
  if (auth && !token) {
    setToken(auth)
  }
  //  console.log(token)
  const classes = useStyles()

  return (
    <ApolloProvider client={client}>
      <div className={classes.root}>
        <CssBaseline />
        {token && <Navbar />}

        <main className={classes.content}>
          <div className={classes.appBarSpacer}>
            <Switch>
              <Route exact path="/" render={() => <SignInSide />} />
              {token && (
                <>
                  <Route exact path="/dashboard" render={() => <Dashboard />} />
                  <Route exact path="/booking" render={() => <Bookingsite />} />
                  <Route exact path='/admin' render={() => <AdminHome />} />
                  <Route path='/admin/services' render={() => <AdminServices />} />
                  <Route path='/admin/rooms' render={() => <AdminRooms />} />
                  <Route path='/admin/accessgroups' render={() => <AdminAccessGroups />} />
                  <Route path='/admin/users' render={() => <AdminUsers />} />
                </>
              )}
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </main>
      </div>
    </ApolloProvider>
  )
}

export default App
