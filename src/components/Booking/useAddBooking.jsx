import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_BOOKINGS_BY_ROOM } from "../Bookings/useBookingsByRoom"


const CREATE_BOOKING = gql`
  mutation addBooking(
    $startTime: String!
    $endTime: String!
    $date: String!
    $roomId: ID!
  ) {
    addBooking(
      startTime: $startTime
      endTime: $endTime
      date: $date
      roomId: $roomId
    ) {
      id
    }
  }
`
const useAddBooking = ({ id }) => {
  const [mutate, { loading }] = useMutation(CREATE_BOOKING, {
    refetchQueries: [
      { query: GET_BOOKINGS_BY_ROOM, variables: { id } }
    ]
  })
  const createBooking = booking => mutate({ variables: { ...booking } })
  return [createBooking, { loading }]
}

export default useAddBooking
