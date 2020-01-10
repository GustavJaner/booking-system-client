import useUser from "./useUser"
import React from "react"
import { Form, Field } from "react-final-form"
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid"

import {
  TextFieldAdapter,
  ReactSelectAdapter
} from "../FinalFormComponents/Form"
import useAccessGroups from "../AccessGroups/useAccessGroups"
import useUpdateUser from "./useUpdateUser"

const EditUserForm = ({ id, onClose }) => {
  const accessGroupQuery = useAccessGroups()
  const [updateUser, { error }] = useUpdateUser({ id })

  const submitForm = async (user, form) => {
    console.log("before", user)
    user.accessGroupIds = user.accessGroupIds.map(option => option.value)
    user.role = user.role.value

    await updateUser(user)
    if (error) console.log(error)
    else onClose()
  }
  const { user, loading } = useUser({ id })

  if (loading || accessGroupQuery.loading) return <p> loading</p>
  if (user) console.log("user", user)
  return (
    <>
      <Form
        onSubmit={submitForm}
        initialValues={{
          id: id,
          username: user.username,
          accessGroupIds: user.accessGroups.map(ag => ({
            label: ag.name,
            value: ag.id
          })),
          role: user.role ? { value: user.role, label: user.role } : undefined
        }}
        validate={values => {
          const errors = {}
          if (!values.accessGroupIds) {
            errors.accessGroupIds = "Required"
          }
          if (!values.username) {
            errors.username = "Required"
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
              <Grid item xs={3}>
                <Field
                  name="username"
                  disabled
                  component={TextFieldAdapter}
                  floatingLabelText="Username"
                />
              </Grid>
              <Grid item xs={3}>
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
              <Grid item xs={3}>
                <label>
                  Accessgroups
                  <Field
                    name="accessGroupIds"
                    component={ReactSelectAdapter}
                    options={accessGroupQuery.accessGroups.map(ag => ({
                      label: ag.name,
                      value: ag.id
                    }))}
                    isMulti
                  />
                </label>
              </Grid>

              <Grid item xs={3}>
                <Button type="submit" color="primary" variant="contained">
                  Update user
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </>
  )
}

export default EditUserForm
