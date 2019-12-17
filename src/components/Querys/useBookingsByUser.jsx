import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"

export const GET_BOOKINGS = gql`
  query bookingsByUser {
    bookingsByUser {
      id
      startTime
      endTime
      date
      room {
        name
      }
    }
  }
`

const useBookingsByUser = () => {
  const { data, loading } = useQuery(GET_BOOKINGS, {
    pollInterval: 500
  })
  console.log("bookingsbyuser", data)

  const bookings = dotProp.get(data, "bookingsByUser", [])

  return { bookings, loading }
}

export default useBookingsByUser
