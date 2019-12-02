import React from "react"
import useVisible from "../GeneralHooks/useVisible"
import EditServiceForm from "./EditServiceForm"

const EditServiceButton = ({ id }) => {
  const { open, setFalse, toggle } = useVisible()
  return (
    <>
      {open && <EditServiceForm id={id} onClose={setFalse} />}
      <button onClick={() => toggle()}> Edit</button>
    </>
  )
}

export default EditServiceButton
