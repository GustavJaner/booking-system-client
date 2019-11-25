import React, { useEffect } from "react"
import usePosts from "../../components/Posts/usePosts"
import PostList from "../../components/Posts/List"
import CreatePost from "../../components/Post/CreatePostForm"
const Posts = () => {
  const { posts = [], subscribeToPostUpdates, loading } = usePosts()
  useEffect(() => {
    subscribeToPostUpdates()
  }, [])
  if (loading) {
    return <p> Loading</p>
  }
  return (
    <>
      <h2> create</h2>
      <CreatePost />
      <h2>get posts</h2>
      <PostList posts={posts} />
    </>
  )
}

export default Posts
