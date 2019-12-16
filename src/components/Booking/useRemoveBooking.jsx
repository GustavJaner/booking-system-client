import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

const REMOVE_BOOKING = gql`
  mutation removeBooking(
    $id: ID!
    ) {
    removeBooking(
      id: $id
      ){
        id
        date
      }
  }
`
const useRemoveBooking = () => {
  const [mutate, { loading, data, error }] = useMutation(REMOVE_BOOKING)

  const removeBooking = booking => mutate({ variables: { ...booking } })

  return [removeBooking, { loading, data, error }]
}
export default useRemoveBooking;









