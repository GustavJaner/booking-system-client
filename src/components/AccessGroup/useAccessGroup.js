import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"
export const GET_ACCESS_GROUPS = gql`
  query useAccessGroup{
    accessGroups{
      id
      description
    }
  }
`
const useAccessGroup = ({ id }) => {
  const { data, loading } = useQuery(GET_ACCESS_GROUPS, { variables: { id } })
  const accessgroup = dotProp.get(data, "accessgroup")
  
  return { accessgroup, loading }
}

export default useAccessGroup
