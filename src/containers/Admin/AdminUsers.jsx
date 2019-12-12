import React from "react"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import useUsers from "../../components/Users/useUsers"
import UserList from "../../components/Users/UserList"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(2)
  }
}))

const AdminUsers = () => {
  const { users, loading } = useUsers()
  const classes = useStyles()

  if (loading) {
    return <p> loading </p>
  }

  return (
    <MuiThemeProvider>
      <Paper className={classes.paper}>
        <Typography variant="h6" noWrap>
          Users
        </Typography>
        <UserList users={users} />
      </Paper>
    </MuiThemeProvider>
  )
}
export default AdminUsers
