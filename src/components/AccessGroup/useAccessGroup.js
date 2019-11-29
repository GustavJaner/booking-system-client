import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"
export const GET_ACCESS_GROUP = gql`
  query useAccessGroup($id: ID!) {
    accessgroup(id: $id) {
      id
      description
    }
  }
`
const useAccessGroup = ({ id }) => {
  const { data, loading } = useQuery(GET_ACCESS_GROUP, { variables: { id } })
  const accessgroup = dotProp.get(data, "accessgroup")

  return { accessgroup, loading }
}

export default useAccessGroup
