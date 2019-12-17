import React, { forwardRef } from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import PersonIcon from "@material-ui/icons/Person"
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService"
import HomeIcon from "@material-ui/icons/Home"
import { Link } from "react-router-dom"

const adminHomeLink = forwardRef((props, ref) => (
  <Link innerRef={ref} to="/admin" {...props} />
))
const adminServiceLink = forwardRef((props, ref) => (
  <Link innerRef={ref} to="/admin/services" {...props} />
));

const adminRoomLink = forwardRef((props, ref) => (
  <Link innerRef={ref} to="/admin/rooms" {...props} />
));

const adminAccessGroupLink = forwardRef((props, ref) => (
  <Link innerRef={ref} to="/admin/accessgroups" {...props} />
));

const adminUserLink = forwardRef((props, ref) => (
  <Link innerRef={ref} to="/admin/users" {...props} />
));

const BookingLink = forwardRef((props, ref) => (
  <Link innerRef={ref} to="/booking" {...props} />
))

const HomeLink = forwardRef((props, ref) => (
  <Link innerRef={ref} to="/dashboard" {...props} />
))

export const adminListItems = (
  <div>
    <ListItem button component={adminHomeLink}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary={"Home"} />
    </ListItem>

    <ListItem button component={adminServiceLink}>
      <ListItemIcon>
        <LocalLaundryServiceIcon />
      </ListItemIcon>
      <ListItemText primary={"Services"} />
    </ListItem>

    <ListItem button component={adminRoomLink}>
      <ListItemIcon>
        <MeetingRoomIcon />
      </ListItemIcon>
      <ListItemText primary={"Rooms"} />
    </ListItem>

    <ListItem button component={adminAccessGroupLink}>
      <ListItemIcon>
        <VpnKeyIcon />
      </ListItemIcon>
      <ListItemText primary={"Access Groups"} />
    </ListItem>

    <ListItem button component={adminUserLink}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary={"Users"} />
    </ListItem>
  </div>
)

export const bookingListItems = (
  <div>
    <ListItem button component={HomeLink}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    {/*<ListItem button component={BookingLink}>
          <ListItemIcon>
              <RoomIcon />
          </ListItemIcon>
          <ListItemText primary="Rooms" />
      </ListItem>
      <ListItem button >
          <ListItemIcon>
              <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
      </ListItem>*/}
    <ListItem button component={BookingLink}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Book" />
    </ListItem>
  </div>
)
