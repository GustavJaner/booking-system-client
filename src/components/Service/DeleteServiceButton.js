import React from "react"
import useRemoveService from "./useRemoveService"

const DeleteServiceButton = ({ id }) => {
  const [removeService] = useRemoveService()

  return <button onClick={() => removeService(id)}>Remove</button>
}
export default DeleteServiceButton
