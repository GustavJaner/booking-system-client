import React, { useState } from "react"
import { Form, Field } from "react-final-form"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import {
  TextFieldAdapter,
  ReactSelectAdapter,
  TimePickerWrapper,
  DurationPickerWrapper
} from "../FinalFormComponents/Form"
import useAccessGroups from "../AccessGroups/useAccessGroups"
import useCreateUser from "./useCreateUser"

const required = value => (value ? undefined : "Required")
const CreateUserForm = () => {
  const { accessGroups, loading } = useAccessGroups()
  const [createUser, { error }] = useCreateUser()

  const submitForm = async (user, form) => {
    console.log("user", user)
    user.accessGroupIds = user.accessGroupIds.map(option => option.value)
    user.role = [user.role.value]
    await createUser(user)
    setTimeout(form.reset)
    if (error) console.log(error)
    else console.log("user created")
  }

  if (loading) {
    return <p> Loading</p>
  }
  return (
    <>
      <Form
        onSubmit={submitForm}
        validate={values => {
          const errors = {}
          if (!values.accessGroupIds) {
            errors.accessGroupIds = "Required"
          }
          if (!values.username) {
            errors.username = "Required"
          }
          if (!values.password) {
            errors.password = "Required"
          }
          if (!values.confirm) {
            errors.confirm = "Required"
          } else if (values.confirm !== values.password) {
            errors.confirm = "Must match"
          }
          return errors
        }}
        render={({ handleSubmit, form, values }) => (
          <form
            onSubmit={event => {
              handleSubmit(event, form)
            }}
          >
            <Grid
              container
              spacing={3}
              alignItems="center"
              alignContent="center"
            >
              <Grid item xs={4}>
                <Field
                  name="username"
                  component={TextFieldAdapter}
                  floatingLabelText="Username"
                  validate={required}
                />
              </Grid>
              <Grid item xs={4}>
                <label>
                  Role
                  <Field
                    name="role"
                    component={ReactSelectAdapter}
                    options={[
                      { value: "admin", label: "admin" },
                      { value: "user", label: "user" }
                    ]}
                  />
                </label>
              </Grid>
              <Grid item xs={4}>
                <label>
                  Accessgroups
                  <Field
                    name="accessGroupIds"
                    component={ReactSelectAdapter}
                    options={accessGroups.map(ag => ({
                      label: ag.name,
                      value: ag.id
                    }))}
                    isMulti
                  />
                </label>
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="password"
                  component={TextFieldAdapter}
                  floatingLabelText="Password"
                  validate={required}
                  type="password"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="confirm"
                  component={TextFieldAdapter}
                  floatingLabelText="Confirm password"
                  //validate={required}
                  type="password"
                />
              </Grid>
              <Grid item xs={4}>
                <Button type="submit" color="primary" variant="contained">
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </>
  )
}

export default CreateUserForm
