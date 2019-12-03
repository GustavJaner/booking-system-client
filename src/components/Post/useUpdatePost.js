import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_POSTS } from "../Posts/usePosts"

const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $title: String!, $content: String!) {
    updatePost(id: $id, title: $title, content: $content) {
      title
      content
      id
    }
  }
`
const useUpdatePost = () => {
  const [mutate, { loading }] = useMutation(UPDATE_POST, {
    refetchQueries: [{ query: GET_POSTS }]
  })
  const updatePost = post => mutate({ variables: { ...post } })
  return [updatePost, { loading }]
}

export default useUpdatePost
