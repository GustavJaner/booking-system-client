import React from "react"
import useRemoveService from "./useRemoveService"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: theme.spacing(7),
  },
}));

const DeleteServiceButton = ({ id }) => {
  
  const [removeService] = useRemoveService()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteAndClose = () => {
    removeService(id)
    setOpen(false);
  };

  return (
  <>  
      <IconButton
        variant="contained"
        onClick={handleClickOpen}
      >
        <DeleteIcon />
      </IconButton>
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this service? This action is permanent and cannot be undone.
          </DialogContentText>
        </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus >
              No
            </Button>
            <Button onClick={deleteAndClose} color="secondary" >
              Yes
            </Button>
          </DialogActions>
      </Dialog>
  </>
  )
}

export default DeleteServiceButton