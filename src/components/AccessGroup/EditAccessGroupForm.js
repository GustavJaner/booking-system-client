import React from "react"
import { Form, Field } from "react-final-form"
import useAccessGroup from "./useAccessGroup"
import useUpdateAccessGroup from "./useUpdateAccessGroup"

const EditAccessGroupForm = ({ id, onClose }) => {
  const { loading, accessGroup } = useAccessGroup({ id })
  const [updateAccessGroup] = useUpdateAccessGroup()
  console.log("test",accessGroup)
  const submitForm = async accessGroup => {
    updateAccessGroup(accessGroup)
    onClose()
  }
  if (loading) {
    return <p> Loading </p>
  }
  return (
    <Form
      onSubmit={submitForm}
      initialValues={{ id: accessGroup.id, description: accessGroup.description }}
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
