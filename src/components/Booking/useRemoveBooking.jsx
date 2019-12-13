import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

const REMOVE_BOOKING = gql`
  mutation removeBooking($id: ID!) {
    removeBooking(id: $id)
  }
`
const useRemoveBooking = () => {
  const [mutate, { loading, data }] = useMutation(REMOVE_BOOKING)

  const removeBooking = booking => mutate({ variables: { ...booking } })

  return [removeBooking, { loading, data }]
}
export default useRemoveBooking;









