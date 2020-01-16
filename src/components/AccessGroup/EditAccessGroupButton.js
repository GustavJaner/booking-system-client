import React from "react"
import { Form, Field } from "react-final-form"
import { TextFieldAdapter } from "../FinalFormComponents/Form"
import useUpdateAccessGroup from "./useUpdateAccessGroup"
import CircularProgress from '@material-ui/core/CircularProgress'
import useAccessGroup from "./useAccessGroup"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: theme.spacing(2),
  },
}));


const EditAccessGroupButton = ({ id }) => {
  const { loading, accessGroup } = useAccessGroup({ id })
  const [updateAccessGroup] = useUpdateAccessGroup()
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const submitForm = async accessGroup => {
    updateAccessGroup(accessGroup)

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
    <DialogTitle id="alert-dialog-title">{"Edit Access Group"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Edit the name of the access group
          </DialogContentText>
          <Form
            onSubmit={submitForm}
            initialValues={{
              id: id,
              name: accessGroup.name
            }}
          >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="name" component={TextFieldAdapter} floatingLabelText="New Access Group Name" />
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

export default EditAccessGroupButton

/* <IconButton aria-label="Edit Access Group">
<EditIcon />
</IconButton> 
      {open && <EditAccessGroupForm id={id} onClose={setFalse} />}*/

/*<TextField
            autoFocus
            margin="dense"
            id="name"
            label="New name"
            fullWidth
            onSubmit={submitForm}
          >
          {props => (
        <form onSubmit={props.handleSubmit}>
          <TextField name="name" component="input" floatingLabelText="name" />
          <Button type="submit">Update</Button>
        </form>
      )}
          </TextField>*/