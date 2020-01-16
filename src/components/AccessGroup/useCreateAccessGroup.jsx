import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_ACCESS_GROUPS } from "../AccessGroups/useAccessGroups"

const CREATE_ACCESS_GROUP = gql`
  mutation addAccessGroup($name: String!) {
    addAccessGroup(name: $name) {
      id
      name
    }
  }
`

const useCreateAccessGroup = () => {
  const [mutate, { loading }] = useMutation(CREATE_ACCESS_GROUP, {
    refetchQueries: [{ query: GET_ACCESS_GROUPS }]
  })
  const updateAccessGroup = accessGroup =>
    mutate({ variables: { ...accessGroup } })
  return [updateAccessGroup, { loading }]
}

export default useCreateAccessGroup