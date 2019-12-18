import React, { useState } from "react"
import { Form, Field } from "react-final-form"
import useRoom from "./useRoom"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import SnackBar from "@material-ui/core/Snackbar"
import {
  TextFieldAdapter,
  DurationPickerWrapper,
  SelectAdapter
} from "../FinalFormComponents/Form"
import useServices from "../Services/useServices"
import useUpdateRoom from "./useUpdateRoom"
import useAccessGroups from "../AccessGroups/useAccessGroups"
import moment from "moment";


const required = value => (value && value.length !== 0 ? undefined : "Required")

const EditRoomForm = ({ id, onClose }) => {
  const services = useServices()
  const accessgroups = useAccessGroups()
  const [updateRoom] = useUpdateRoom({ id })
  const { loading, room } = useRoom({ id })
  const [open, setOpen] = useState(false);


  const handleClose = () => {
    setOpen(false);
  }

  const submitForm = async _room => {
    //_room.duration = (_room.duration.hour()*60) + _room.duration.minute();
    _room.duration = parseInt(_room.duration);
    console.log("Room", _room)

    if(moment(_room.end, 'HH:mm').diff(moment(_room.start, 'HH:mm'), 'minutes') % _room.duration !== 0){
      setOpen(true);
    } else {
      
      await updateRoom(_room)
    
      onClose()
    }
  }
  if (loading || services.loading || accessgroups.loading)
    return <p> loading</p>

  return (
    <>
    <Form
      onSubmit={submitForm}
      initialValues={{
        id: id,
        name: room.name,
        start: room.start,
        end: room.end,
        duration: room.duration,
        adress: room.adress,
        description: room.description,
        serviceId: room.service.id,
        accessGroupIds: room.accessGroups.map(ag => (
          ag.id
        ))
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={3} alignItems="center" alignContent="center">
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
                component={TextFieldAdapter}
                floatingLabelText="First booking time"
                validate={required}
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="end"
                component={TextFieldAdapter}
                floatingLabelText="Last booking ends"
                validate={required}
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="duration"
                component={TextFieldAdapter}
                floatingLabelText="Duration in minutes"
                validate={required}
                />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="adress"
                component={TextFieldAdapter}
                floatingLabelText="Adress to the room"
                validate={required}
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="description"
                component={TextFieldAdapter}
                floatingLabelText="Description of the room"
                validate={required}
              />
            </Grid>
            <Grid item xs={4}>
                <Field
                    name="serviceId"
                    label="Service"
                    component={SelectAdapter}
                    validate={required}
                    options={services.services.map(service => ({
                      name: service.name,
                      id: service.id
                    }))}
                    />
            </Grid>
            <Grid item xs={4}>
                  <Field
                    name="accessGroupIds"
                    label="Access Group"
                    component={SelectAdapter}
                    validate={required}
                    isMulti
                    options={accessgroups.accessGroups.map(ag => ({
                      name: ag.name,
                      id: ag.id
                    }))}
                    />
            </Grid>
            <Grid item xs={4}>
              <Button type="submit" color="primary" variant="contained">
                Update
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
      message={'Update failed since duration does not fit timeslot'}
        />
        </>
  )
}
export default EditRoomForm
