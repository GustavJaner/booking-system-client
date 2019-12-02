import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"
export const GET_ROOMS = gql`
  query useRooms {
    rooms {
      name
      id
    }
  }
`
const useRooms = () => {
  const { data, loading } = useQuery(GET_ROOMS)

  const rooms = dotProp.get(data, "rooms", [])
  return { rooms, loading }
}

export default useRooms
