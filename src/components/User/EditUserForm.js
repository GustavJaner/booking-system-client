import useUser from "./useUser"
import React from "react"
import { Form, Field } from "react-final-form"

import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import _ from "lodash"
import {
  TextFieldAdapter,
  ReactSelectAdapter
} from "../FinalFormComponents/Form"

const EditUserForm = ({ id, onClose }) => {
  const handleSubmit = input => {
    console.log("input..", input)
    onClose()
  }
  const { user, loading } = useUser({ id })
  if (loading) return <p> loading</p>
  if (user) console.log("user", user)
  return (
    <>
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          username: user.username,
          role: user.role,
          accessGroups: user.accessGroups
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Field
                  name="username"
                  component="input"
                  disabled
                  floatingLabelText="Username"
                />
                <Field
                  name="role"
                  component="input"
                  disabled
                  floatingLabelText="Username"
                />
                <Field
                  name="accessGroups"
                  component="input"
                  disabled
                  floatingLabelText=""
                />
              </Grid>
            </Grid>
          </form>
        )}
      </Form>
    </>
  )
}

export default EditUserForm
