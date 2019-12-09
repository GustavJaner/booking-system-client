import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"

export const GET_BOOKINGS = gql`
  query bookingsByUser($id: ID!){
    bookingsByUser(id: $id) {
        id,
        startTime, 
        endTime,
        date,
        room {
          name
        }
    }
  }
`
const useBookingsByUser = ({ id }) => {
  const { data, loading } = useQuery(GET_BOOKINGS, { variables: { id }, pollInterval: 500 })

  const bookings = dotProp.get(data, "bookingsByUser", []);

  return { bookings, loading }
}

export default useBookingsByUser




