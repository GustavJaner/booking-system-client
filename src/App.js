import React from "react"
import { render } from "react-dom"

import client from "./apollo"
import { ApolloProvider } from "@apollo/react-hooks"
import Posts from "./containers/Posts"
import Admin from "./containers/Admin"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => (
  <ApolloProvider client={client}>
  <Router>
    <Admin />
  </Router>
  </ApolloProvider>
)

export default App
