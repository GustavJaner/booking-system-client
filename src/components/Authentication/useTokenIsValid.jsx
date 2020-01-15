import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"
export const CHECK_TOKEN = gql`
  query useTokenisValid {
    tokenIsValid
  }
`
const useTokenisValid = () => {
    const { data, loading } = useQuery(CHECK_TOKEN)
    const tokenValid = dotProp.get(data, 'tokenIsValid', [])
    return { tokenValid, loading }
}

export default useTokenisValid
