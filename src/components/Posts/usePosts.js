import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import dotProp from "dot-prop"
export const GET_POSTS = gql`
  query usePosts {
    posts {
      content
      id
      title
    }
  }
`

const POSTS_SUBSCRIPTION = gql`
  subscription postsUpdates {
    postUpdated {
      added {
        id
        content
        title
      }
      removed {
        id
      }
      updated {
        id
        content
        title
      }
    }
  }
`
const usePosts = () => {
  const { data, loading, subscribeToMore } = useQuery(GET_POSTS)
  const posts = dotProp.get(data, "posts", [])

  const subscribeToPostUpdates = () => {
    return subscribeToMore({
      document: POSTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        const removedPostItem = subscriptionData.data.postUpdated.removed
        const newPostItem = subscriptionData.data.postUpdated.added
        const updatedPostItem = subscriptionData.data.postUpdated.updated
        if (removedPostItem) {
          return Object.assign({}, prev, {
            posts: prev.posts.filter(post => post.id !== removedPostItem.id)
          })
        }
        if (newPostItem) {
          return Object.assign({}, prev, {
            posts: [newPostItem, ...prev.posts]
          })
        }
        if (updatedPostItem) {
          return Object.assign({}, prev, {
            posts: prev.posts.map(post => {
              if (post.id === updatedPostItem.id) {
                return { ...post, ...updatedPostItem }
              }
              return post
            })
          })
        }
      }
    })
  }

  return { posts, subscribeToPostUpdates, loading }
}

export default usePosts
