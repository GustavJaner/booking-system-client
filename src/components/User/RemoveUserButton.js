import React from "react"
import { Button } from "@material-ui/core"
import useRemoveUser from "./useRemoveUser"
import useVisible from "../GeneralHooks/useVisible"
import ConfirmDelete from "../General/ConfirmDelete"

const RemoveUserButton = ({ id }) => {
  const [removeUser, { loading, error }] = useRemoveUser(id)
  const { open, setFalse, toggle } = useVisible()

  return (
    <>
      <Button onClick={toggle} variant="contained" color="secondary">
        {" "}
        Remove User
      </Button>
      <ConfirmDelete
        deleteFunction={() => removeUser(id)}
        open={open}
        handleClose={setFalse}
      />
    </>
  )
}

export default RemoveUserButton
