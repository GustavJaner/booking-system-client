import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"
import useAccessGroup from "./useAccessGroup"
export const GET_ACCESS_GROUPS = gql`
  query useAccessGroups {
    accessgroups(id: $id) {
      id
      description
    }
  }
`

const useAccessGroups = () => {
  const { data, loading } = useQuery(GET_ACCESS_GROUPS)
  const accessgroups = dotProp.get(data, "accessgroups", [])


  return { accessgroups, loading }
}

export default useAccessGroups
