import React from "react"
import { Form, Field } from "react-final-form"
import { TextFieldAdapter } from "../FinalFormComponents/Form"
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import useCreateService from "./useCreateService"
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import useService from "./useService"
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

const variantIcon = {
  success: CheckCircleIcon,
};


const CreateServiceButton = ({ id }) => {
  const { loading, service } = useService({ id })
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [createService] = useCreateService()
  const checked = React.useState(true);

  const submitForm = async service => {
    createService(service)

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
    <Tooltip title="Add Service" aria-label="add">
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
    <DialogTitle id="alert-dialog-title">{"Add Service"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Add a new service
          </DialogContentText>
          <Form
      onSubmit={submitForm}
      initialValues={{
        id: id,
        name: service.name
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="name" component={TextFieldAdapter} floatingLabelText="Service Name" />
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

export default CreateServiceButton