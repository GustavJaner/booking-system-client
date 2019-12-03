import React from "react"
import DeleteServiceButton from "../Service/DeleteServiceButton"
import EditServiceButton from "../Service/EditServiceButton"

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const ServiceList = ({ services = [] }) => {
  return (
    <List>
      {services.map(service => (
        <ListItem key={service.id}>
          {service.name}
          <EditServiceButton id={service.id} />
          <DeleteServiceButton id={service.id} />
        </ListItem>
      ))}
    </List>
  )
}
export default ServiceList

/*



    <Grid item xs={12} md={6}>
      <Typography variant="h6" className={services.title}>
        Text only
      </Typography>
      <div className={services.List}>
        <List dense={dense}>
        {services.map(service => (
          <ListItem key={service.id}>
            {service.name}
            <DeleteServiceButton id={service.id} />
            <EditServiceButton id={service.id} />
          </ListItem>,
        ))}
        </List>
      </div>
    </Grid>

*/