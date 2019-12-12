import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

const GET_AUTHTOKEN = gql`
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
    const [mutate, { loading }] = useMutation(GET_AUTHTOKEN)
    const loginUser = userInfo =>
        mutate({ variables: { ...userInfo } })
    return [loginUser, { loading }]
}

export default useLogin;









