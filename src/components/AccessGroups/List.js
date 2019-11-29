import React from "react"
import DeleteAccessGroupButton from "../AccessGroup/DeleteAccessGroupButton"
import UpdateAccessGroupButton from "../AccessGroup/UpdateAccessGroupButton"

const AccessGroupList = ({ accessGroups = [] }) => {
  return (
    <ul>
      {accessGroups.map(accessGroup => (
        <li key={accessGroup.id}>
          {" "}
          {accessGroup.id} - {accessGroup.description}
          <UpdateAccessGroupButton id={accessGroup.id} />
        </li>
      ))}
    </ul>
  )
}

export default AccessGroupList
