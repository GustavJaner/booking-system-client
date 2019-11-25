import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"
export const GET_POST = gql`
  query usePost($id: ID!) {
    post(id: $id) {
      content
      id
      title
    }
  }
`
const usePost = ({ id }) => {
  const { data, loading } = useQuery(GET_POST, { variables: { id } })
  const post = dotProp.get(data, "post")

  return { post, loading }
}

export default usePost
