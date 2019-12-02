import React from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_ROOMS } from "../Rooms/useRooms"
import { GET_ROOM } from "./useRoom"
const UPDATE_ROOM = gql`
  mutation updateRoom(
    $start: String
    $end: String
    $duration: Int
    $name: String
    $adress: String
    $description: String
    $serviceId: ID
    $id: ID!
    $accessGroupIds: [ID!]
  ) {
    updateRoom(
      start: $start
      id: $id
      name: $name
      end: $end
      duration: $duration
      adress: $adress
      description: $description
      serviceId: $serviceId
      accessGroupIds: $accessGroupIds
    ) {
      id
      name
    }
  }
`

const useUpdateRoom = ({ id }) => {
  const [mutate] = useMutation(UPDATE_ROOM, {
    refetchQueries: [
      { query: GET_ROOMS },
      { query: GET_ROOM, variables: { id } }
    ]
  })
  const updateRoom = room => {
    mutate({ variables: { ...room } })
  }
  return [updateRoom]
}

export default useUpdateRoom
