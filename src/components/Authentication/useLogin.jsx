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
  const [mutate, { loading }] = useMutation(LOGIN_USER)
  const loginUser = User => mutate({ variables: { ...User } })

  return [loginUser, { loading }]
}

export default useLogin
