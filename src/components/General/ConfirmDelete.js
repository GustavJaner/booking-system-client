import React from "react"
import { Modal, Button, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

const ConfirmDelete = ({ deleteFunction, open, handleClose }) => {
  const deleteStuff = () => {
    deleteFunction()
    handleClose()
  }
  const classes = useStyles()
  return (
    <Modal className={classes.paper} open={open} toggle={handleClose}>
      <Paper>
        <h1>Are you sure you want to delete?</h1>
        <Button onClick={handleClose} variant="contained">
          {" "}
          Cancel
        </Button>
        <Button onClick={deleteStuff} variant="contained" color="secondary">
          {" "}
          Delete
        </Button>
      </Paper>
    </Modal>
  )
}

export default ConfirmDelete
