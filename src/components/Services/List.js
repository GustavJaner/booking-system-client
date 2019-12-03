import React from "react"
import DeleteServiceButton from "../Service/DeleteServiceButton"
import EditServiceButton from "../Service/EditServiceButton"

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

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