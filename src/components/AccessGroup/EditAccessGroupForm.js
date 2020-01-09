import React from "react"
import { Form, Field } from "react-final-form"
import useAccessGroup from "./useAccessGroup"
import useUpdateAccessGroup from "./useUpdateAccessGroup"
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'

const EditAccessGroupForm = ({ id }) => {
  const { loading, accessGroup } = useAccessGroup({ id })
  const [updateAccessGroup] = useUpdateAccessGroup()
  const submitForm = async accessGroup => {
    updateAccessGroup(accessGroup)

  }
  if (loading) {
    return <div> <CircularProgress /> </div>
  }
  return (
    
    <Form
      onSubmit={submitForm}
      initialValues={{
        id: id,
        name: accessGroup.name
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="name" component="input" floatingLabelText="name" />
          <Button type="submit">Update</Button>
        </form>
      )}
    </Form>
  )
}

export default EditAccessGroupForm
