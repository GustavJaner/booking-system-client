import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"
export const CHECK_ADMIN = gql`
  query useIsAdmin {
    isAdmin
  }
`
const useIsAdmin = () => {
    const { data, loading } = useQuery(CHECK_ADMIN)
    const admin = dotProp.get(data, 'isAdmin', [])
    const adminLoading = loading
    return { admin, adminLoading }
}

export default useIsAdmin
