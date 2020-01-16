import React, { useState } from "react"
import AdminHome from "./containers/Admin/AdminHome"
import Navbar from "./components/Drawer/drawer"
import AdminAccessGroups from "./containers/Admin/AdminAccessGroups"
import AdminRooms from "./containers/Admin/AdminRooms"
import AdminServices from "./containers/Admin/AdminServices"
import { Switch, Route, Redirect } from "react-router-dom"
import AdminUsers from "./containers/Admin/AdminUsers"
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles } from "@material-ui/core/styles"
import Bookingsite from "./containers/BookingContainers/BookingSite"
import PageNotFound from "./containers/404Page"
import Dashboard from "./containers/Dashboard/Dashboard.jsx"
import SignInSide from "./containers/SignIn/SigninSide"
import { AUTH_TOKEN } from "./constants"
import useTokenIsValid from './components/Authentication/useTokenIsValid'
import useIsAdmin from './components/Authentication/useIsAdmin'



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


//Redirect to signin page if not authenticated
function PrivateRoute({ children, validToken, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        validToken ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}


//Redirect to dashboard if authenticated
function LoginRoute({ children, validToken, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !validToken ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/dashboard",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

const App = () => {
  const [token, setToken] = useState(null)
  const { tokenValid, loading, refetch } = useTokenIsValid()
  const { admin, adminLoading } = useIsAdmin()

  let auth = localStorage.getItem(AUTH_TOKEN)
  if (auth && !token) {
    setToken(auth)
  }
  const classes = useStyles()

  //Very rudimental logout feature..
  const handleLogout = () => {
    localStorage.setItem(AUTH_TOKEN, 'auth-token')
    refetch()
  }

  //TODO loading animation..
  if (loading || adminLoading) {
    return (
      <>
      </>
    )
  }

  return (
    <Switch>
      <LoginRoute exact path="/" validToken={tokenValid}>
        <SignInSide refetch={refetch} />
      </LoginRoute>
      <div className={classes.root}>
        <CssBaseline />
        <Navbar logout={handleLogout} admin={admin} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer}>
            <PrivateRoute path="/dashboard" validToken={tokenValid}>
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/booking" validToken={tokenValid}>
              <Bookingsite />
            </PrivateRoute>
            <PrivateRoute exact path="/admin" validToken={tokenValid}>
              <AdminHome />
            </PrivateRoute>
            <PrivateRoute path="/admin/services" validToken={tokenValid}>
              <AdminServices />
            </PrivateRoute>
            <PrivateRoute path="/admin/rooms" validToken={tokenValid}>
              <AdminRooms />
            </PrivateRoute>
            <PrivateRoute path="/admin/accessgroups" validToken={tokenValid}>
              <AdminAccessGroups />
            </PrivateRoute>
            <PrivateRoute path="/admin/users" validToken={tokenValid}>
              <AdminUsers />
            </PrivateRoute>
            {
              //Not working for some reason, always loads...
              //<Route component={PageNotFound} />
            }
          </div>
        </main>
      </div >
    </Switch>
  )
}

export default App
