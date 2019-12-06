import React from "react"
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import useAccessGroups from "../../components/AccessGroups/useAccessGroups"
import Typography from '@material-ui/core/Typography';
import AccessGroupList from "../../components/AccessGroups/List"

const useStyles = makeStyles(theme => ({

  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(2)
  }
}));

const AdminAccessGroups = () => {

  const classes = useStyles()
  const { accessGroups = [] } = useAccessGroups()

  return(
    <Paper className={classes.paper}>
      <Typography variant="h6" noWrap>
        Access Groups
      </Typography>
      <AccessGroupList accessGroups={accessGroups} />
    </Paper>
  )
}
export default AdminAccessGroups

