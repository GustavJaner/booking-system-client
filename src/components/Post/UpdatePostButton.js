import React, { useState } from "react"
import EditPostForm from "./EditPostForm"

const UpdatePostButton = ({ id }) => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  return (
    <>
      {open && <EditPostForm id={id} onClose={onClose} />}
      <button onClick={onOpen}>Edit</button>
    </>
  )
}

export default UpdatePostButton
