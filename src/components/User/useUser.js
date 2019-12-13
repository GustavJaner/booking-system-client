import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import dotProp from "dot-prop"

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      username
      id
      accessGroups {
        name
        id
      }
      role
    }
  }
`

const useUser = ({ id }) => {
  const { data, loading } = useQuery(GET_USER, { variables: { id } })
  const user = dotProp.get(data, "user")
  return { user, loading }
}

export default useUser
