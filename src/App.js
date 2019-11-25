import React from "react"
import { render } from "react-dom"

import client from "./apollo"
import { ApolloProvider } from "@apollo/react-hooks"
import Posts from "./containers/Posts"

const App = () => (
  <ApolloProvider client={client}>
    <Posts />
  </ApolloProvider>
)

export default App
