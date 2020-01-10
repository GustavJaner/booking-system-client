import React from "react"
import useRemoveRoom from "./useRemoveRoom"
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
  buttonStyle: {
    minHeight: 30,
    marginTop: 20,
  },
}));

const DeleteRoomButton = ({ id }) => {
  const [removeRoom] = useRemoveRoom()
  const classes = useStyles();

  return (
    <Button
      className={classes.buttonStyle}
      variant="contained"
      color="secondary"
      onClick={() => id? removeRoom(id) :  null}
      size="small"
    >
      Remove Room
    </Button>
  )
}

export default DeleteRoomButton
