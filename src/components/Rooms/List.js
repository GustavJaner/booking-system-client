import React from "react"

const RoomList = ({ rooms }) => {
  return (
    <>
      <ul>
        {rooms.map(room => (
          <li> {room.name}</li>
        ))}
      </ul>
    </>
  )
}

export default RoomList
