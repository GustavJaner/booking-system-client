import React from "react"
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
  const [token, setToken] = React.useState(null)
  const { tokenValid, loading } = useTokenIsValid()
  let auth = localStorage.getItem(AUTH_TOKEN)
  if (auth && !token) {
    setToken(auth)
  }
  const classes = useStyles()

  if (loading) {
    return (
      <>
      </>
    )
  }

  return (
    <Switch>
      <LoginRoute exact path="/" validToken={tokenValid}>
        <SignInSide />
      </LoginRoute>
      <div className={classes.root}>
        <CssBaseline />
        <Navbar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer}>
            <PrivateRoute path="/dashboard" validToken={tokenValid}>
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/booking" validToken={tokenValid}>
              <Bookingsite />
            </PrivateRoute>
            <PrivateRoute path="/admin" validToken={tokenValid}>
              <AdminServices />
            </PrivateRoute>
            <PrivateRoute path="/rooms" validToken={tokenValid}>
              <AdminRooms />
            </PrivateRoute>
            <PrivateRoute path="/accessgroups" validToken={tokenValid}>
              <AdminAccessGroups />
            </PrivateRoute>
            <PrivateRoute path="/users" validToken={tokenValid}>
              <AdminUsers />
            </PrivateRoute>
            <Route component={PageNotFound} />
          </div>
        </main>
      </div >
    </Switch>
  )
}

export default App
