import React from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_USERS } from "../Users/useUsers"

const CREATE_USER = gql`
  mutation CreateUser(
    $username: String!
    $password: String!
    $accessGroupIds: [ID]
    $role: [String]
  ) {
    addUser(
      username: $username
      password: $password
      accessGroupIds: $accessGroupIds
      role: $role
    ) {
      id
      username
    }
  }
`
const useCreateUser = () => {
  const [mutate, { error }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }]
  })
  const createUser = user =>
    mutate({
      variables: { ...user }
    })
  return [createUser, { error }]
}

export default useCreateUser
