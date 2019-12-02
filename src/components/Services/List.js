import React from "react"
import DeleteServiceButton from "../Service/DeleteServiceButton"
import EditServiceButton from "../Service/EditServiceButton"

const ServiceList = ({ services = [] }) => {
  return (
    <ul>
      {services.map(service => (
        <li key={service.id}>
          {service.name}
          <DeleteServiceButton id={service.id} />
          <EditServiceButton id={service.id} />
        </li>
      ))}
    </ul>
  )
}
export default ServiceList
