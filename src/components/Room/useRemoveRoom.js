import React from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_ROOMS } from "../Rooms/useRooms"
const DELETE_ROOM = gql`
  mutation removeRoom($id: ID!) {
    removeRoom(id: $id)
  }
`

const useRemoveRoom = () => {
  const [mutate] = useMutation(DELETE_ROOM, {
    refetchQueries: [{ query: GET_ROOMS }]
  })
  const removeRoom = id => mutate({ variables: { id } })
  return [removeRoom]
}

export default useRemoveRoom
