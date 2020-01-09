import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_BOOKINGS_BY_ROOM } from "../Bookings/useBookingsByRoom"

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
const useRemoveBooking = ({ id = null }) => {
  const [mutate, { loading, data, error }] = useMutation(REMOVE_BOOKING, {
    refetchQueries: [
      { query: GET_BOOKINGS_BY_ROOM, variables: { id } }
    ]
  })

  const removeBooking = booking => mutate({ variables: { ...booking } })

  return [removeBooking, { loading, data, error }]
}
export default useRemoveBooking;









