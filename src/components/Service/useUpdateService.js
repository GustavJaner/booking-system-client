import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_SERVICES } from "../Services/useServices"

const UPDATE_SERVICE = gql`
  mutation updateService($id: ID!, $name: String!) {
    updateService(id: $id, name: $name) {
      name
      id
    }
  }
`

const useUpdateService = () => {
  const [mutate, { loading }] = useMutation(UPDATE_SERVICE, {
    refetchQueries: [{ query: GET_SERVICES }]
  })
  const updateService = service => mutate({ variables: { ...service } })
  return [updateService, { loading }]
}

export default useUpdateService
