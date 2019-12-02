import React from "react"
import EditRoomButton from "../Room/EditRoomButton"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import DeleteRoomButton from "../Room/DeleteRoomButton"
const RoomList = ({ rooms }) => {
  return (
    <>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            {" "}
            {room.name} <EditRoomButton id={room.id} />{" "}
            <DeleteRoomButton id={room.id} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default RoomList
