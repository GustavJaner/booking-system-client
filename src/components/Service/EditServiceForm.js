import React from "react"
import { Form, Field } from "react-final-form"
import useService from "./useService"
import useUpdateService from "./useUpdateService"

const EditServiceForm = ({ id, onClose }) => {
  const { loading, service } = useService({ id })
  const [updateService] = useUpdateService()
  const submitForm = async service => {
    updateService(service)
    onClose()
  }
  if (loading) {
    return <p> Loading </p>
  }
  return (
    <Form
      onSubmit={submitForm}
      initialValues={{ id: service.id, name: "" }}
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

export default EditServiceForm
