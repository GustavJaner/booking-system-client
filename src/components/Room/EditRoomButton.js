import React from "react"
import useVisible from "../GeneralHooks/useVisible"
import EditRoomForm from "./EditRoomForm"
import { Button } from "@material-ui/core"

const EditRoomButton = ({ id }) => {
  const { open, setFalse, toggle } = useVisible()
  return (
    <>
      {open && <EditRoomForm id={id} onClose={setFalse} />}
      <Button onClick={() => toggle()} variant="contained" color="primary">
        {" "}
        Edit
      </Button>
    </>
  )
}

export default EditRoomButton
