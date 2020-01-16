import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        username
        id
      }
    }
  }
`
const useLogin = () => {
  const [mutate, { loading, error }] = useMutation(LOGIN_USER, { errorPolicy: 'all' })
  const loginUser = User => mutate({ variables: { ...User } })

  const loginError = (error ? true : false)

  return [loginUser, { loading, loginError }]
}

export default useLogin
