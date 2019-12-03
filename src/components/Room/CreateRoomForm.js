import React, { useState } from "react"
import { Form, Field } from "react-final-form"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import SnackBar from "@material-ui/core/Snackbar"
import _ from "lodash"
import {
  TextFieldAdapter,
  ReactSelectAdapter
} from "../FinalFormComponents/Form"
import useServices from "../Services/useServices"
import useCreateRoom from "./useCreateRoom"
import useAccessGroups from "../AccessGroups/useAccessGroups"
import moment from "moment";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}))
const required = value => (value ? undefined : "Required")

const CreateRoomForm = () => {
  const [createRoom] = useCreateRoom()
  const services = useServices()
  const access = useAccessGroups()
  const classes = useStyles()
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

 

  const submitForm = async _room => {
 
    _room.duration = parseInt(_room.duration)
    if(moment(_room.end, 'HH:mm').diff(moment(_room.start, 'HH:mm'), 'minutes') % _room.duration != 0){
      setOpen(true);
    } else {

    
        _room.serviceId = _room.serviceId.value
        _room.accessGroupIds = _room.accessGroupIds
          ? _room.accessGroupIds.map(ag => ag.value)
          : []
    
        
        await createRoom(_room)
        
    }
  }

  if (services.loading || access.loading) return <p> loading</p>
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
