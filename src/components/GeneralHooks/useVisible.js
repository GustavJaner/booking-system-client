import React, { useState } from "react"

const useVisible = start => {
  const [open, setOpen] = useState(start || false)
  function toggle() {
    setOpen(!open)
  }
  function setFalse() {
    setOpen(false)
  }
  function setTrue() {
    setOpen(true)
  }

  return { open, toggle, setFalse, setTrue }
}

export default useVisible
