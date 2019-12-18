import React from "react"
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import EditRoomButton from "../Room/EditRoomButton"
import DeleteRoomButton from "../Room/DeleteRoomButton"

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const RoomList = ({ rooms = [] ,toggle}) => {
  
  const classes = useStyles();

  const [roomID, setRoom] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <div>
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} id="outlined-label">
        Rooms
      </InputLabel>
      <Select
        labelId="outlined-label"
        id="select-outlined"
        value={roomID}
        onChange={(e) => setRoom(e.target.value) }
        labelWidth={labelWidth}
      >
      {rooms.map(room => (
        <MenuItem key={room.name} value={room.id}>
          {room.name}
        </MenuItem>
        ))}
        
      </Select>
    </FormControl>
    <EditRoomButton id={roomID} hideCreate={toggle} />
    <DeleteRoomButton id={roomID} />

    </div>
  )
  
}
export default RoomList

/*

    <List>
      {services.map(service => (
        <ListItem key={service.id}>
          {service.name}
          <EditServiceButton id={service.id} />
          <DeleteServiceButton id={service.id} />
        </ListItem>
      ))}
    </List>

 <Grid item xs={4}>
              <label>
                Service
                <Field
                  name="serviceId"
                  component={ReactSelectAdapter}
                  options={services.services.map(service => ({
                    label: service.name,
                    value: service.id
                  }))}
                  validate={required}
                />
              </label>
            </Grid>

*/





/*import React from "react"
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import EditRoomButton from "../Room/EditRoomButton"
import DeleteRoomButton from "../Room/DeleteRoomButton"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ServiceList = ({ rooms = [] }) => {
  
  const classes = useStyles();

  const [roomID, setRoom] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);


const RoomList = ({ rooms }) => {
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        Rooms
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={roomID}
        onChange={(e) => setRoom(e.target.value) }
        labelWidth={labelWidth}
      >
      {rooms.map(room => (
        <MenuItem value={room.id}>
          {room.name}
        </MenuItem>
        ))}
        
      </Select>
    </FormControl>
    
  )
}

export */