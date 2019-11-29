import React from "react"
import { Form, Field } from "react-final-form"
import useRoom from "./useRoom"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import {
  TextFieldAdapter,
  ReactSelectAdapter
} from "../FinalFormComponents/Form"
import useServices from "../Services/useServices"
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

const EditRoomForm = ({ id, onClose }) => {
  const services = useServices()
  const classes = useStyles()
  const submitForm = room => {
    console.log("room change", room)
    onClose()
  }
  const { loading, room } = useRoom({ id })
  if (loading || services.loading) return <p> loading</p>
  return (
    <Form
      onSubmit={submitForm}
      initialValues={{
        name: room.name,
        start: room.start,
        end: room.end,
        duration: room.duration,
        adress: room.adress,
        description: room.description,
        service: { value: room.service.id, label: room.service.name },
        accessGroups: room.accessGroups.map(ag => ({
          label: ag.description,
          value: ag.id
        }))
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Field
                name="name"
                component={TextFieldAdapter}
                floatingLabelText="Room Name"
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="start"
                component={TextFieldAdapter}
                floatingLabelText="First booking time"
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="end"
                component={TextFieldAdapter}
                floatingLabelText="Last booking ends"
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="duration"
                component={TextFieldAdapter}
                floatingLabelText="Duration of a booking"
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
                  name="service"
                  label="accessgroup"
                  floatingLabelText="Services"
                  placeholder="Accessgroups"
                  component={ReactSelectAdapter}
                  options={services.services.map(service => ({
                    label: service.name,
                    value: service.id
                  }))}
                />
              </label>
            </Grid>
            <Grid item xs={4}>
              <>
                <label>
                  {" "}
                  Accessgroups
                  <Field component={ReactSelectAdapter} isMulti />
                </label>
              </>
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
  )
}
export default EditRoomForm
