import React from "react"
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles'
import useServices from "../../components/Services/useServices"
import ServiceList from "../../components/Services/List"
import CreateService from "../../components/Service/CreateService"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import ServiceCards from "../../components/Services/ServiceCards";
import CreateServiceButton from "../../components/Service/CreateServiceButton";


const useStyles = makeStyles(theme => ({

  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(2)
  },

  button: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  }

}));


const AdminServices = () => {

  const classes = useStyles()
  const { services = []} = useServices()


  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" noWrap>
        Services
      </Typography>
      <br/>
      <ServiceCards services={services} />

      
        <CreateServiceButton />

    </Paper>
  )
}
export default AdminServices

/*<ServiceList services={services} />
          <CreateService />*/
