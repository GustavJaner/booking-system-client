import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"

export const GET_POST = gql`
  query roomByService($id: ID!){
    roomByService(id: $id) {
      name,
      id,
      start,
      end,
      duration
    }
  }
`
const useRoomByServiceId = ({ id }) => {
  const { data, loading } = useQuery(GET_POST, { variables: { id } })
  const rooms = dotProp.get(data, "roomByService", []);
  return { rooms, loading }
}

export default useRoomByServiceId
