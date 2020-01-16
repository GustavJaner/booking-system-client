import React from "react"
import { Form, Field } from "react-final-form"
import { TextFieldAdapter } from "../FinalFormComponents/Form"
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useUpdateService from "./useUpdateService";
import useService from "./useService"
import IconButton from '@material-ui/core/IconButton';

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
}));

const EditServiceButton = ({ id }) => {
  const { loading, service } = useService({ id })
  const [updateService] = useUpdateService()
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  const submitForm = async service => {
    updateService(service)

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
      <IconButton
        onClick={handleClickOpen}
      >
        <EditIcon />
      </IconButton>
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">{"Edit Service"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Edit the name of the service
          </DialogContentText>
          <Form
            onSubmit={submitForm}
            initialValues={{
              id: id,
              name: service.name,
            }}
          >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="name" component={TextFieldAdapter} floatingLabelText="New Service Name" />
          <Button type="submit" onClick={handleClose} color="primary">Submit</Button>
        </form>
      )}
    </Form>
        </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus >
              Cancel
            </Button>
          </DialogActions>
      </Dialog>
    </>
    
  )
}

export default EditServiceButton