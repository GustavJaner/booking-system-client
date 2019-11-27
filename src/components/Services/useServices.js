import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"
export const GET_SERVICES = gql`
  query useServices {
    services {
      name
      id
    }
  }
`

const useServices = () => {
  const { data, loading } = useQuery(GET_SERVICES)
  const services = dotProp.get(data, "services", [])

  return { services, loading }
}

export default useServices
