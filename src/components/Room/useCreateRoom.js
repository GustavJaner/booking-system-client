import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_ROOMS } from "../Rooms/useRooms"
const CREATE_ROOM = gql`
  mutation addRoom(
    $start: String!
    $end: String!
    $name: String!
    $adress: String
    $description: String
    $accessGroupIds: [ID!]!
    $serviceId: ID!
    $duration: Int!
  ) {
    addRoom(
      start: $start
      end: $end
      duration: $duration
      name: $name
      adress: $adress
      description: $description
      accessGroupIds: $accessGroupIds
      serviceId: $serviceId
    ) {
      name
      id
    }
  }
`

const useCreateRoom = () => {
  const [mutate] = useMutation(CREATE_ROOM, {
    refetchQueries: [{ query: GET_ROOMS }]
  })
  const createRoom = room => mutate({ variables: { ...room } })
  return [createRoom]
}
export default useCreateRoom




