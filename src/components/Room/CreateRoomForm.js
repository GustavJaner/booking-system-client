import React, { useState } from "react"
import { Form, Field } from "react-final-form"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import SnackBar from "@material-ui/core/Snackbar"
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  TextFieldAdapter,
  TimePickerWrapper,
  DurationPickerWrapper,
  SelectAdapter
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
    _room.duration = (_room.duration.hour()*60) + _room.duration.minute();

    if(moment(_room.end, 'HH:mm').diff(moment(_room.start, 'HH:mm'), 'minutes') % _room.duration !== 0){
      setOpen(true);
    } else {
      _room.start = _room.start.format('HH:mm')
      _room.end = _room.end.format('HH:mm')
      console.log("Room in Create", _room)
      await createRoom(_room)
    } 
  }

  if (services.loading || access.loading) return <div> <CircularProgress /> </div>
  return (
    <>
    <Form onSubmit={submitForm}
          render={({ handleSubmit, form}) => ( 
        <form onSubmit={(event) => {
          const promise = handleSubmit(event);
          promise && promise.then(() => {
            form.reset();
          })
          return promise;
        }}>
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
                component={TimePickerWrapper}
                label="Start time"
                validate={required}
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="end"
                component={TimePickerWrapper}
                validate={required}
                label="End time"
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="duration"
                component={DurationPickerWrapper}
                label="Duration"
                validate={required}
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="adress"
                component={TextFieldAdapter}
                floatingLabelText="Adress"
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="description"
                component={TextFieldAdapter}
                floatingLabelText="Description  "
              />
            </Grid>
            <Grid item xs={4}>
                  <Field
                    name="serviceId"
                    label="Service"
                    component={SelectAdapter}
                    options={services.services.map(service => ({
                      name: service.name,
                      id: service.id
                    }))}
                    validate={required}
                    />
            </Grid>
            <Grid item xs={4}>
                  <Field
                    name="accessGroupIds"
                    label="Access Group"
                    component={SelectAdapter}
                    options={access.accessGroups.map(ag => ({
                      name: ag.name,
                      id: ag.id
                    }))}
                    isMulti
                    validate={required}
                    />
            </Grid>
            <Grid item xs={4}>
              <Button type="submit" color="primary" variant="contained">
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      )}/>
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


