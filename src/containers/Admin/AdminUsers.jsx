import React from "react"
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({

  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(2)
  }

}));


const AdminUsers = () => {

const classes = useStyles()
  
  return(
      <Paper className={classes.paper}>
        <Typography variant="h6" noWrap>
          Users
        </Typography>
      </Paper>

    )

}
export default AdminUsers

