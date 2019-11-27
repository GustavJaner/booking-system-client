import React from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_SERVICES } from "../Services/useServices"

const CREATE_SERVICE = gql`
  mutation addService($name: String!) {
    addService(name: $name) {
      name
      id
    }
  }
`
const useCreateService = () => {
  const [mutate, { loading }] = useMutation(CREATE_SERVICE, {
    refetchQueries: [{ query: GET_SERVICES }]
  })
  const createService = ({ name }) => mutate({ variables: { name } })
  return [createService, { loading }]
}

export default useCreateService
