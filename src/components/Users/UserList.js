import React from "react"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import EditUserButton from "../User/EditUserButton"
import RemoveUserButton from "../User/RemoveUserButton"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: 40,
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

const UserList = ({ users = [] , toggle}) => {
  const classes = useStyles()
  const [userID, setUser] = React.useState('');
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <div>
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} id="outlined-label">
        Users
      </InputLabel>
      <Select
        labelId="outlined-label"
        id="select-outlined"
        value={userID}
        onChange={(e) => setUser(e.target.value) }
        labelWidth={labelWidth}
      >
      {users.map(user => (
        <MenuItem key={user.username} value={user.id}>
          {user.username}
        </MenuItem>
        ))}
        
      </Select>
    </FormControl>
    <EditUserButton id={userID} toggleCreate={toggle} />
    <RemoveUserButton id={userID} />
</div>
  )
}
    
export default UserList
