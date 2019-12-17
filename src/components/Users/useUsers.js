import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"
export const GET_USERS = gql`
  query users {
    users {
      username
      id
    }
  }
`

const useUsers = () => {
  const { data, loading } = useQuery(GET_USERS)
  const users = dotProp.get(data, "users")
  return { users, loading }
}
export default useUsers
