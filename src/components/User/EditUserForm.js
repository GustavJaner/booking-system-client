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
import useAccessGroups from "../AccessGroups/useAccessGroups"

const EditUserForm = ({ id, onClose }) => {
  const accessGroupQuery = useAccessGroups()
  const handleSubmit = input => {
    console.log("input..", input)
    onClose()
  }
  const { user, loading } = useUser({ id })
  console.log(accessGroupQuery)
  if (loading || accessGroupQuery.loading) return <p> loading</p>
  if (user) console.log("user", user)
  return (
    <>
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          username: user.username,
          role: user.role
          //accessGroups: user.accessGroups
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Field
                  name="username"
                  component={TextFieldAdapter}
                  floatingLabelText="Username"
                />
              </Grid>
              <Grid item xs={4}>
                <label>
                  Role
                  <Field
                    name="role"
                    component="input"
                    component={ReactSelectAdapter}
                    isMulti
                    options={[
                      { value: "admin", label: "admin" },
                      { value: "user", label: "user" }
                    ]}
                  />
                </label>
              </Grid>

              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </form>
        )}
      </Form>
    </>
  )
}

export default EditUserForm
