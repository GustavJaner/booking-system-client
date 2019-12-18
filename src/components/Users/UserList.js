import React from "react"
import useVisible from "../GeneralHooks/useVisible"
import { makeStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import EditUserButton from "../User/EditUserButton"
import RemoveUserButton from "../User/RemoveUserButton"

const UserList = ({ users = [] }) => {
  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: "100%"
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }))
  console.log("users", users)
  const classes = useStyles()
  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.username}
              <EditUserButton id={user.id} />
              <RemoveUserButton id={user.id} />
            </li>
          ))}
        </ul>
      </FormControl>
    </>
  )
}

export default UserList
