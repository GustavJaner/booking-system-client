import React from "react"
import DeleteAccessGroupButton from "../AccessGroup/DeleteAccessGroupButton"
import EditAccessGroupButton from "../AccessGroup/EditAccessGroupButton"

const AccessGroupList = ({ accessGroups = [] }) => {
  //console.log("access",accessGroups)
  //console.log(accessGroups.map(accessGroup => accessGroup.id))

  return (
    <ul>
      {accessGroups.map(accessGroup => (
        <li key={accessGroup.id}>
          {accessGroup.name}
          <DeleteAccessGroupButton id={accessGroup.id} />
          <EditAccessGroupButton id={accessGroup.id} />
        </li>
      ))}
    </ul>
  )
}

export default AccessGroupList
