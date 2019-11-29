import React from "react"
import EditRoomButton from "../Room/EditRoomButton"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import DeleteRoomButton from "../Room/DeleteRoomButton"
const RoomList = ({ rooms }) => {
  return (
    <>
      <MuiThemeProvider>
        <ul>
          {rooms.map(room => (
            <li>
              {" "}
              {room.name} <EditRoomButton id={room.id} />{" "}
              <DeleteRoomButton id={room.id} />
            </li>
          ))}
        </ul>
      </MuiThemeProvider>
    </>
  )
}

export default RoomList
