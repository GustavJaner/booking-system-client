import React from "react"
import useVisible from "../GeneralHooks/useVisible"
import EditServiceForm from "./EditServiceForm"
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const EditServiceButton = ({ id }) => {
  const { open, setFalse, toggle } = useVisible()
  console.log(id)
  return (
    <>
      {open && <EditServiceForm id={id} onClose={setFalse} />}
      <IconButton color="primary" edge="end" aria-label="edit">
        <EditIcon onClick={() => toggle()} Edit/>
      </IconButton>
    </>
  )
}

export default EditServiceButton
