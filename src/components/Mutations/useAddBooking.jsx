import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { GET_BOOKINGS } from "../Querys/useBookingsByUser"

const CREATE_BOOKING = gql`
  mutation addBooking($startTime: String!, $endTime: String!, $date: String!, $userId: ID!, $roomId: ID!) {
    addBooking(startTime: $startTime, endTime: $endTime, date:$date, userId:$userId, roomId:$roomId) {
      id
    }
  }
`
const useAddBooking = () => {
  const [mutate, { loading }] = useMutation(CREATE_BOOKING)
  const createBooking = booking =>
    mutate({ variables: { ...booking } })
  return [createBooking, { loading }]
}

export default useAddBooking;









