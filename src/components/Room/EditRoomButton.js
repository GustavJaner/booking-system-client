import React from "react"
import useVisible from "../GeneralHooks/useVisible"
import EditRoomForm from "./EditRoomForm"
import { Button } from "@material-ui/core"

const EditRoomButton = ({ id ,hideCreate}) => {
  const { open, setFalse, toggle } = useVisible()
  const handlePress = () => {
    if(id){
    toggle()
    hideCreate()
  }

  }
  return (
    <>
      {open && <EditRoomForm id={id} onClose={toggle} />}
      <Button onClick={() => handlePress()} variant="contained" color="primary">
        {" "}
        Edit
      </Button>
    </>
  )
}

export default EditRoomButton
