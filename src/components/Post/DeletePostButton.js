import React from "react"
import useRemovePost from "./useRemovePost"

const DeletePostButton = ({ id }) => {
  const [removePost] = useRemovePost()
  return <button onClick={() => removePost(id)}>Remove</button>
}

export default DeletePostButton
