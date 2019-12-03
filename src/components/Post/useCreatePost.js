import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_POSTS } from "../Posts/usePosts"

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    addPost(title: $title, content: $content) {
      title
      content
    }
  }
`
const useCreatePost = () => {
  const [mutate, { loading }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }]
  })
  const createPost = ({ title, content }) =>
    mutate({ variables: { title, content } })
  return [createPost, { loading }]
}

export default useCreatePost
