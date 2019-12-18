import React from "react"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { GET_USERS } from "../Users/useUsers"
const DELETE_USER = gql`
  mutation removeUser($id: ID!) {
    removeUser(id: $id) {
      id
    }
  }
`
const useRemoveUser = () => {
  const [mutate, { loading, error }] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }]
  })
  const removeUser = id => mutate({ variables: { id } })
  return [removeUser, { loading, error }]
}

export default useRemoveUser
