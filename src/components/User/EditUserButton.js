import React from "react"
import useVisible from "../GeneralHooks/useVisible"
import EditUserForm from "./EditUserForm"

const EditUserButton = ({ id }) => {
  const { open, setFalse, toggle } = useVisible()
  return (
    <>
      <button onClick={() => toggle()}>Edit User</button>
      {open && <EditUserForm id={id} onClose={setFalse} />}

    </>
  )
}

export default EditUserButton
