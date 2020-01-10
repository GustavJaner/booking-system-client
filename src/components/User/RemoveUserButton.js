import React from "react"
import { Button } from "@material-ui/core"
import useRemoveUser from "./useRemoveUser"
import useVisible from "../GeneralHooks/useVisible"
import ConfirmDelete from "../General/ConfirmDelete"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
  buttonStyle: {
    minHeight: 30,
    marginTop: 20,
  },
}));
const RemoveUserButton = ({ id }) => {
  const [removeUser, { loading, error }] = useRemoveUser(id)
  const { open, setFalse, toggle } = useVisible()
  const classes = useStyles();

  return (
    <>
      <Button
        className={classes.buttonStyle}
        onClick={toggle} 
        variant="contained" 
        color="secondary"
        size="small"
        onClick={id? toggle : null}
        >
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
