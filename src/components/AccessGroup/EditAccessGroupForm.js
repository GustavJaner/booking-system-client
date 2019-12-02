import React from "react"
import { Form, Field } from "react-final-form"
import useAccessGroup from "./useAccessGroup"
import useUpdateAccessGroup from "./useUpdateAccessGroup"

const EditAccessGroupForm = ({ id, onClose }) => {
  const { loading, accessGroup } = useAccessGroup({ id })
  const [updateAccessGroup] = useUpdateAccessGroup()
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
      initialValues={{
        id: id,
        name: accessGroup.name
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="name" component="input" placeholder="name" />
          <button type="submit">Update</button>
        </form>
      )}
    </Form>
  )
}

export default EditAccessGroupForm
