import React from "react"
import useRemoveService from "./useRemoveService"
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


const DeleteServiceButton = ({ id }) => {
  const [removeService] = useRemoveService()

  return(
    <IconButton color="secondary" edge="end" aria-label="delete">
      <DeleteIcon onClick={() => removeService(id)} Remove />
    </IconButton>
    ) 
}
export default DeleteServiceButton
