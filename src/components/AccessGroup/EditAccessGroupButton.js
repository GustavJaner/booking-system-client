import React from "react"
import useVisible from "../GeneralHooks/useVisible"
import EditAccessGroupForm from "./EditAccessGroupForm"

const EditAccessGroupButton = ({ id }) => {
  const { open, setFalse, toggle } = useVisible()
  return (
    <>
      {open && <EditAccessGroupForm id={id} onClose={setFalse} />}
      <button onClick={() => toggle()}>Edit</button>
    </>
  )
}

export default EditAccessGroupButton
