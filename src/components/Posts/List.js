import React from "react"
import DeletePostButton from "../Post/DeletePostButton"
import UpdatePostButton from "../Post/UpdatePostButton"

const List = ({ posts = [] }) => {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          {" "}
          {post.title} - {post.content} <DeletePostButton id={post.id} />
          <UpdatePostButton id={post.id} />
        </li>
      ))}
    </ul>
  )
}
export default List
