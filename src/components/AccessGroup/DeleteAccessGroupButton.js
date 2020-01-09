import React from "react"
import useRemoveAccessGroup from "./useRemoveAccessGroup"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: theme.spacing(7),
  },
}));

const DeleteAccessGroupButton = ({ id }) => {
  
  const classes = useStyles();
  const [removeAccessGroup] = useRemoveAccessGroup()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteAndClose = () => {
    setOpen(false);
    removeAccessGroup(id)
  };

  return (
  <>  
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        Delete
      </Button>
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this access group? This action is permanent and cannot be undone.
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

export default DeleteAccessGroupButton