import React from "react"
import { render } from "react-dom"

import client from "./apollo"
import { ApolloProvider } from "@apollo/react-hooks"
import Posts from "./containers/Posts"
import Admin from "./containers/Admin"

const App = () => (
  <ApolloProvider client={client}>
    <Admin />
  </ApolloProvider>
)

export default App
