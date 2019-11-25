import React from "react"
import useCreatePost from "./useCreatePost"
import { Form, Field } from "react-final-form"
const CreatePost = () => {
  const [createPost] = useCreatePost()

  return (
    <Form onSubmit={createPost}>
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="title" component="input" placeholder="title" />
          <Field name="content" component="input" placeholder="content" />
          <button type="submit">create</button>
        </form>
      )}
    </Form>
  )
}

export default CreatePost
