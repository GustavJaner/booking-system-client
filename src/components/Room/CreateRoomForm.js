import React, { useState } from "react"
import { Form, Field } from "react-final-form"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import SnackBar from "@material-ui/core/Snackbar"
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  TextFieldAdapter,
  ReactSelectAdapter,
  TimePickerWrapper
} from "../FinalFormComponents/Form"
import useServices from "../Services/useServices"
import useCreateRoom from "./useCreateRoom"
import useAccessGroups from "../AccessGroups/useAccessGroups"
import moment from "moment";


const required = value => (value ? undefined : "Required")

const CreateRoomForm = () => {
  const [createRoom] = useCreateRoom()
  const services = useServices()
  const access = useAccessGroups()
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

 

  const submitForm = async _room => {
    _room.duration = parseInt(_room.duration)
    if(moment(_room.end, 'HH:mm').diff(moment(_room.start, 'HH:mm'), 'minutes') % _room.duration !== 0){
      setOpen(true);
    } else {
      _room.start = _room.start.format('HH:mm')
      _room.end = _room.end.format('HH:mm')
      _room.serviceId = _room.serviceId.value
      _room.accessGroupIds = _room.accessGroupIds
        ? _room.accessGroupIds.map(ag => ag.value)
        : []
  
      await createRoom(_room)
        
    }
  }

  if (services.loading || access.loading) return <div> <CircularProgress /> </div>
  return (
    <>
    <Form onSubmit={submitForm}>
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Field
                name="name"
                component={TextFieldAdapter}
                floatingLabelText="Room Name"
                validate={required}
              />
            </Grid>
            <Grid item xs={4}>
            <Field
                name="start"
                component={TimePickerWrapper}
                floatingLabelText="First booking time"
                label="Start time"
                //validate={required}
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="end"
                component={TimePickerWrapper}
                floatingLabelText="Last booking ends"
                validate={required}
                label="End time"
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="duration"
                component={TextFieldAdapter}
                floatingLabelText="Duration of a booking"
                validate={required}
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="adress"
                component={TextFieldAdapter}
                floatingLabelText="Adress to the room"
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="description"
                component={TextFieldAdapter}
                floatingLabelText="description of the room"
              />
            </Grid>
            <Grid item xs={4}>
              <label>
                Service
                <Field
                  name="serviceId"
                  component={ReactSelectAdapter}
                  options={services.services.map(service => ({
                    label: service.name,
                    value: service.id
                  }))}
                  validate={required}
                />
              </label>
            </Grid>
            <Grid item xs={4}>
              <>
                <label>
                  {" "}
                  Accessgroups
                  <Field
                    name="accessGroupIds"
                    component={ReactSelectAdapter}
                    options={access.accessGroups.map(ag => ({
                      label: ag.name,
                      value: ag.id
                    }))}
                    isMulti
                    validate={required}
                  />
                </label>
              </>
            </Grid>
            <Grid item xs={4}>
              <Button type="submit" color="primary" variant="contained">
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
    <SnackBar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
    open={open}
    onClose={handleClose}
    autoHideDuration={4000}
    message={'Duration does not fit into time slot'}
      />
    </>
  )
}
export default CreateRoomForm

/*


*/

