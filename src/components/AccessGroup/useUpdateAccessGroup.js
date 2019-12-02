import React from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_ACCESS_GROUPS } from "../AccessGroups/useAccessGroups"

const UPDATE_ACCESS_GROUP = gql`
  mutation updateAccessGroup($id: ID!, $name: String!) {
    updateAccessGroup(id: $id, name: $name) {
      id
      name
    }
  }
`

const useUpdateAccessGroup = () => {
  const [mutate, { loading }] = useMutation(UPDATE_ACCESS_GROUP, {
    refetchQueries: [{ query: GET_ACCESS_GROUPS }]
  })
  const updateAccessGroup = accessGroup =>
    mutate({ variables: { ...accessGroup } })
  return [updateAccessGroup, { loading }]
}

export default useUpdateAccessGroup
