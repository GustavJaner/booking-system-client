import React from "react"
import DeleteAccessGroupButton from "../AccessGroup/DeleteAccessGroupButton"
import UpdateAccessGroupButton from "../AccessGroup/UpdateAccessGroupButton"

const AccessGroupList = ({ accessGroups = [] }) => {
  //console.log("access",accessGroups)
  //console.log(accessGroups.map(accessGroup => accessGroup.id))

  return (
    <ul>
      {accessGroups.map(accessGroup => (
        <li key={accessGroup.id}>
          {accessGroup.description}
          <DeleteAccessGroupButton id={accessGroup.id} />
          <UpdateAccessGroupButton id={accessGroup.id} />
        </li>
      ))}
    </ul>
  )
}

export default AccessGroupList
