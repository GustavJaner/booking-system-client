import React from "react"
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles'
import useServices from "../../components/Services/useServices"
import ServiceList from "../../components/Services/List"
import CreateService from "../../components/Service/CreateService"
import Typography from '@material-ui/core/Typography';
import ServiceCards from "../../components/Services/ServiceCards";

const useStyles = makeStyles(theme => ({

  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(2)
  }

}));


const AdminServices = () => {

  const { services = []} = useServices()
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" noWrap>
        Services
      </Typography>
      <br/>
      <ServiceCards services={services} />
    </Paper>
  )
}
export default AdminServices

/*<ServiceList services={services} />
          <CreateService />*/
