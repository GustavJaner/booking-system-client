import React from "react"
import useRemoveRoom from "./useRemoveRoom"
import { Button } from "@material-ui/core"

const DeleteRoomButton = ({ id }) => {
  const [removeRoom] = useRemoveRoom()

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => removeRoom(id)}
    >
      Remove Room
    </Button>
  )
}

export default DeleteRoomButton