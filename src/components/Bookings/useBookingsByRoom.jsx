import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"

export const GET_BOOKINGS_BY_ROOM = gql`
  query bookingsByRoom($id: ID!) {
    bookingsByRoom(id: $id) {
      id
      startTime
      endTime
      date
    }
  }
`

const BOOKINGS_SUBSCRIPTION = gql`
  subscription bookingUpdate {
    bookingUpdate {
      added {
        id
        startTime
        endTime
        date
      }
      removed {
        id
      }
      updated {
        id
        startTime
        endTime
        date
      }
    }
  }
`
const useBookingsByRoom = ({ id }) => {
  const { data, subscribeToMore, loading } = useQuery(GET_BOOKINGS_BY_ROOM, {
    variables: { id }
  })
  const bookings = dotProp.get(data, "bookingsByRoom", [])

  const subscribeToBookingUpdates = () => {
    return subscribeToMore({
      document: BOOKINGS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const removedBookingId = subscriptionData.data.bookingUpdate.removed
        const addedBooking = subscriptionData.data.bookingUpdate.added
        const updatedBooking = subscriptionData.data.bookingUpdate.updated
        if (removedBookingId) {
          return Object.assign({}, prev, {
            bookingsByRoom: prev.bookingsByRoom.filter(
              booking => booking.id !== removedBookingId.id
            )
          })
        }
        if (addedBooking) {
          return Object.assign({}, prev, {
            bookingsByRoom: [addedBooking, ...prev.bookingsByRoom]
          })
        }
        if (updatedBooking) {
          return Object.assign({}, prev, {
            bookingsByRoom: prev.bookingsByRoom.map(booking => {
              if (booking.id === updatedBooking.id) {
                return { ...booking, ...updatedBooking }
              }
              return bookings
            })
          })
        }
      }
    })
  }
  return { bookings, loading, subscribeToBookingUpdates }
}

export default useBookingsByRoom
