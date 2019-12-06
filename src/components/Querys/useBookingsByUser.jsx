import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"

export const GET_POST = gql`
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
  const { data, loading } = useQuery(GET_POST, { variables: { id }, pollInterval: 5000 })

  const bookings = dotProp.get(data, "bookingsByUser", []);

  return { bookings, loading }
}

export default useBookingsByUser
