import React from "react"
import { Form, Field } from "react-final-form"
import usePost from "./usePost"
import useUpdatePost from "./useUpdatePost"
const EditPostForm = ({ id, onClose }) => {
  const { post, loading } = usePost({ id })
  const [updatePost] = useUpdatePost({ id })
  const submitForm = async post => {
    await updatePost(post)
    onClose()
  }

  if (loading) return <p> Loading</p>
  return (
    <Form
      onSubmit={submitForm}
      initialValues={{ id: post.id, title: post.title, content: post.content }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="title" component="input" placeholder="title" />
          <Field name="content" component="input" placeholder="content" />
          <button type="submit">Update</button>
        </form>
      )}
    </Form>
  )
}

export default EditPostForm
