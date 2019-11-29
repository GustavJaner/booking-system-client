import React, { useState } from "react"
import EditAccessGroupForm from "./EditAccessGroupForm"

const UpdateAccessgroupButton = ({ id }) => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  return (
    <>
      {open && <EditAccessGroupForm id={id} onClose={onClose} />}
      <button onClick={onOpen}>Edit</button>
    </>
  )
}

export default UpdateAccessgroupButton
