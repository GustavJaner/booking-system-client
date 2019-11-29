import React from "react"
import useRemoveAccessGroup from "./useRemoveAccessGroup"

const DeleteAccessGroupButton = ({ id }) => {
  const [removePost] = useRemoveAccessGroup()
  return <button onClick={() => removePost(id)}>Remove</button>
}

export default DeleteAccessGroupButton
