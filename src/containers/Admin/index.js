import React from "react"

import useServices from "../../components/Services/useServices"
import ServiceList from "../../components/Services/List"
import CreateService from "../../components/Service/CreateService"
import useVisible from "../../components/GeneralHooks/useVisible"
import RoomList from "../../components/Rooms/List"
import useRooms from "../../components/Rooms/useRooms"
import AccessGroupList from "../../components/AccessGroups/List"

const Admin = () => {
  const { services = [], loading } = useServices()
  const { rooms = [] } = useRooms()
  const servicesVisible = useVisible()
  const roomsVisible = useVisible()

  console.log(servicesVisible)
  return (
    <>
      <h1> Admin</h1>
      <h2 onClick={() => servicesVisible.toggle()}>Services</h2>
      {servicesVisible.open && (
        <>
          <ServiceList services={services} />
          <CreateService />
        </>
      )}

      <h2 onClick={() => roomsVisible.toggle()}> Rooms</h2>
      {roomsVisible.open && <RoomList rooms={rooms} />}
      <h2>Accessgroups</h2>
      <AccessGroupList />
    </>
  )
}

export default Admin
