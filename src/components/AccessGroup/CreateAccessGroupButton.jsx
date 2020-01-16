import React from "react"
import { Form, Field } from "react-final-form"
import { TextFieldAdapter } from "../FinalFormComponents/Form"
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import useAccessGroup from "./useAccessGroup";
import useCreateAccessGroup from "./useCreateAccessGroup";
import { Fab } from "@material-ui/core";
import Zoom from '@material-ui/core/Zoom';


const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: theme.spacing(2),
  },
  success: {
    backgroundColor: green[600],
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
    icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  fabButton: {
    position: 'absolute',
    top: theme.spacing(9),
    right: theme.spacing(3),
    width: '1em'
  },
  cancelButton: {
    right: theme.spacing(1.5)
  }
}));

const CreateAccessGroupButton = ({ id }) => {
  const { loading, accessGroup } = useAccessGroup({ id })
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [createAccessGroup] = useCreateAccessGroup()
  const checked = React.useState(true);


  const submitForm = async accessGroup => {
    createAccessGroup(accessGroup)

  }

  if (loading) {
    return <div> <CircularProgress /> </div>
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>  
    <Zoom in={checked}
          {...(checked ? { timeout: 500 } : {})}>
    <Tooltip title="Add Access Group" aria-label="add">
      <Fab
        variant="contained"
        color="primary"
        className={classes.fabButton}
        onClick={handleClickOpen}
        label="Add"
      >
        <AddIcon />
      </Fab>
    </Tooltip>
    </Zoom>
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">{"Add Access Group"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Add a new access group
          </DialogContentText>
          <Form
      onSubmit={submitForm}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="name" component={TextFieldAdapter} floatingLabelText="Access Group Name" />
          <Button type="submit" onClick={handleClose} color="primary">Submit</Button>
        </form>
      )}
    </Form>
        </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className={classes.cancelButton} color="primary" autoFocus >
              Cancel
            </Button>
          </DialogActions>
      </Dialog>
    </>
    
  )
}

export default CreateAccessGroupButton