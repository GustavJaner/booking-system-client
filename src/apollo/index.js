import { ApolloClient } from "apollo-client"
import { split } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { getMainDefinition } from "apollo-utilities"
import { WebSocketLink } from "apollo-link-ws"
import { InMemoryCache } from "apollo-cache-inmemory"
import { setContext } from "apollo-link-context"
import { AUTH_TOKEN } from "../constants"

// Create an http link:
const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "same-origin"
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/graphql`,
  options: {
    reconnect: true
  }
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  authLink.concat(httpLink)
)
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})
export default client
