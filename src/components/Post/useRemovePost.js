import React from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_POSTS } from "../Posts/usePosts"

const DELETE_POST = gql`
  mutation removePost($id: ID!) {
    removePost(id: $id)
  }
`
const useRemovePost = () => {
  const [mutate, { loading }] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_POSTS }]
  })
  const removePost = id => mutate({ variables: { id } })
  return [removePost, { loading }]
}

export default useRemovePost
