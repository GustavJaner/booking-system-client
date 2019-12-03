import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import dotProp from "dot-prop"

export const GET_ROOM = gql`
  query getRoom($id: ID!) {
    room(id: $id) {
      name
      id
      start
      end
      duration
      adress
      description
      service {
        id
        name
      }
      accessGroups {
        id
        name
      }
    }
  }
`

const useRoom = ({ id }) => {
  const { data, loading } = useQuery(GET_ROOM, { variables: { id } })
  const room = dotProp.get(data, "room", {})
  return { room, loading }
}
export default useRoom
