import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"
export const GET_ACCESS_GROUPS = gql`
  query useAccessGroup {
    accessGroups {
      name
      id
    }
  }
`
const useAccessGroup = ({ id }) => {
  const { data, loading } = useQuery(GET_ACCESS_GROUPS, { variables: { id } })
  const accessGroup = dotProp.get(data, "accessGroups")
  return { accessGroup, loading }
}

export default useAccessGroup
