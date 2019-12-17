import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_ACCESS_GROUPS } from "../AccessGroup/useAccessGroup"

const DELETE_ACCESS_GROUP = gql`
  mutation removeAccessGroup($id: ID!) {
    removeAccessGroup(id: $id){id}
  }
`
const useRemoveAccessGroup = () => {
  const [mutate, { loading }] = useMutation(DELETE_ACCESS_GROUP, {
    refetchQueries: [{ query: GET_ACCESS_GROUPS }]
  })
  const removeAccessGroup = id => mutate({ variables: { id } })
  return [removeAccessGroup, { loading }]
}

export default useRemoveAccessGroup
