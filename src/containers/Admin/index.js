import React from "react"

import useServices from "../../components/Services/useServices"
import ServiceList from "../../components/Services/List"
import CreateService from "../../components/Service/CreateService"
import useVisible from "../../components/GeneralHooks/useVisible"

const Admin = () => {
  const { services = [], loading } = useServices()
  const servicesVisible = useVisible(true)

  console.log(servicesVisible)
  return (
    <>
      <h1> Admin</h1>
      <h2 onClick={() => servicesVisible.toggle()}>Services</h2>
      {servicesVisible.open && <ServiceList services={services} />}
      <CreateService />
    </>
  )
}

export default Admin
