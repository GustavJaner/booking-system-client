import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"
export const CHECK_ADMIN = gql`
  query useIsAdmin {
    isAdmin
  }
`
const useIsAdmin = () => {
    const { data, loading, refetch } = useQuery(CHECK_ADMIN)
    const admin = dotProp.get(data, 'isAdmin', [])
    const adminLoading = loading
    const adminRefetch = refetch
    return { admin, adminLoading, adminRefetch }
}

export default useIsAdmin
