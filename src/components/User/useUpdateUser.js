import React from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_USERS } from "../Users/useUsers"
import { GET_USER } from "./useUser"

const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $accessGroupIds: [ID], $role: [String]) {
    updateUser(id: $id, accessGroupIds: $accessGroupIds, role: $role) {
      id
    }
  }
`
const useUpdateUser = ({ id }) => {
  const [mutate, { loading, error }] = useMutation(UPDATE_USER, {
    refetchQueries: [
      { query: GET_USERS },
      { query: GET_USER, variables: { id } }
    ]
  })
  const updateUser = user => mutate({ variables: { ...user } })
  return [updateUser, { loading, error }]
}

export default useUpdateUser
