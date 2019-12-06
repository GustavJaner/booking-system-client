import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"

export const GET_POST = gql`
  query bookingsByRoom($id: ID!){
    bookingsByRoom(id: $id) {
        startTime, 
        endTime,
        date
    }
  }
`
const useBookingsByRoom = ({ id }) => {
  const { data, loading } = useQuery(GET_POST, { variables: { id }, pollInterval: 5000 })

  const bookings = dotProp.get(data, "bookingsByRoom", []);


  return { bookings, loading }
}

export default useBookingsByRoom
