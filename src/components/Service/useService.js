import { useQuery } from "@apollo/react-hooks"
import dotProp from "dot-prop"
import gql from "graphql-tag"
export const GET_SERVICE = gql`
  query useService($id: ID!) {
    service(id: $id) {
      name
      id
    }
  }
`

const useService = ({ id }) => {
  const { data, loading } = useQuery(GET_SERVICE, { variables: { id } })
  const service = dotProp.get(data, "service", {})
  return { service, loading }
}

export default useService
