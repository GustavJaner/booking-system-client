import React from "react"
import useVisible from "../GeneralHooks/useVisible"
import EditUserButton from "../User/EditUserButton"

const UserList = ({ users = [] }) => {
  console.log("users", users)

  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username}
            <EditUserButton id={user.id} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default UserList
