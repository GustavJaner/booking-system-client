import useUser from "./useUser"
import React from "react"
import { Form, Field } from "react-final-form"
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid"

import {
  TextFieldAdapter,
  SelectAdapter
} from "../FinalFormComponents/Form"
import useAccessGroups from "../AccessGroups/useAccessGroups"
import useUpdateUser from "./useUpdateUser"

const EditUserForm = ({ id, onClose }) => {
  const accessgroups = useAccessGroups()
  const [updateUser, { error }] = useUpdateUser({ id })
  const { user, loading } = useUser({ id })

  const submitForm = async (user, form) => {
    console.log("before", user)
    //user.accessGroupIds = user.accessGroupIds.map(option => option.value)
    //user.role = user.role.value

    await updateUser(user)
    if (error) {
      console.log(error)
    }
    else {
      setTimeout(form.reset)
      onClose()
    }
  }

  if (loading || accessgroups.loading) return <p> loading</p>
  if (user) console.log("user", user)
  return (
    <>
      <Form
        onSubmit={submitForm}
        initialValues={{
          id: id,
          username: user.username,
          accessGroupIds: user.accessGroups.map(ag => ag.id),
          role: user.role[0] 
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
                    component={SelectAdapter}
                    options={[
                      { name: "admin", id: "admin" },
                      { name: "user", id: "user" }
                    ]}
                  />
                </label>
              </Grid>
              <Grid item xs={3}>
                <label>
                  Accessgroups
                  <Field
                    name="accessGroupIds"
                    label="Access Group"
                    component={SelectAdapter}
                    isMulti
                    options={accessgroups.accessGroups.map(ag => ({
                      name: ag.name,
                      id: ag.id
                    }))}
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
