import React from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_SERVICES } from "../Services/useServices"

const DELETE_SERVICE = gql`
  mutation removeService($id: ID!) {
    removeService(id: $id)
  }
`

const useRemoveService = () => {
  const [mutate, { loading }] = useMutation(DELETE_SERVICE, {
    refetchQueries: [{ query: GET_SERVICES }]
  })
  const removeServies = id => mutate({ variables: { id } })
  return [removeServies, { loading }]
}
export default useRemoveService
