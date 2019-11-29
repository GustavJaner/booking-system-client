import React from "react"
import { Form, Field } from "react-final-form"
import useAccessGroup from "./useAccessGroup"
import useUpdateAccessGroup from "./useUpdateAccessGroup"

const EditAccessGroupForm = ({ id, onClose }) => {
  const { accessgroup, loading } = useAccessGroup({ id })
  const [updateAccessGroup] = useUpdateAccessGroup({ id })
  const submitForm = async accessgroup => {
    await updateAccessGroup(accessgroup)
    onClose()
  }

  if (loading) return <p> Loading</p>
  return (
    <Form
      onSubmit={submitForm}
      initialValues={{ description: accessgroup.description}}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="description" component="input" placeholder="description" />
          <button type="submit">Update</button>
        </form>
      )}
    </Form>
  )
}

export default EditAccessGroupForm
