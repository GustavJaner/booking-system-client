import React from "react"
import useRemoveAccessGroup from "./useRemoveAccessGroup"

const DeleteAccessGroupButton = ({ id }) => {
  const [removeAccessGroup] = useRemoveAccessGroup()
  return <button onClick={() => removeAccessGroup(id)}>Remove</button>
}

export default DeleteAccessGroupButton
