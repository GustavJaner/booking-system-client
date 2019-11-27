import React from "react"
import useCreateService from "./useCreateService"
import { Form, Field } from "react-final-form"
const CreateService = () => {
  const [createService] = useCreateService()

  return (
    <Form onSubmit={createService}>
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="name" component="input" placeholder="title" />
          <button type="submit">create</button>
        </form>
      )}
    </Form>
  )
}

export default CreateService
