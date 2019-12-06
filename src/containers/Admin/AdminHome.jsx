import React from "react"
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({

  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(2)
  }
}));

const AdminHome = () => {

const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" noWrap>
        Home
      </Typography>
    </Paper>
  )
}

export default AdminHome
