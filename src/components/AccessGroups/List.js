import React from "react"
import DeleteAccessGroupButton from "../Post/DeleteAccessGroupButton"
import UpdateAccessGroupButton from "../Post/UpdatePostButton"

const AccessGroupList = ({ accessGroups = [] }) => {
  return (
    <ul>
      {accessGroups.map(accessGroup => (
        <li key={accessGroup.id}>
          {" "}
          {accessGroup.id} - {accessGroup.description} <DeleteAccessGroupButton id={accessGroup.id} />
          <UpdateAccessGroupButton id={accessGroup.id} />
        </li>
      ))}
    </ul>
  )
}

export default AccessGroupList
